import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { FileDropzone } from './component/file-dropzone/file-dropzone';
import { DataTypeSelector } from './component/import-data/data-type-selector/data-type-selector';
import { UploadProgress } from './component/upload-progress/upload-progress';
import { DataPreviewTable } from './component/import-data/data-preview-table/data-preview-table';
import { UploadSuccess } from './component/upload-success/upload-success';
import { OcrSuccess } from './component/import-data/ocr-success/ocr-success';
import { UploadService } from '../../shared/services/upload.service';
import { ColumnMappingComponent } from './component/column-mapping/column-mapping';
import * as XLSX from 'xlsx';
import { DocumentTypeSelector } from './component/import-document/document-type-selector/document-type-selector';
import { DocumentValidation } from './component/import-document/document-validation/document-validation';
import { ValidationResult } from '../../shared/model/documentation-validation';

@Component({
  selector: 'app-upload-center',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FileDropzone,
    DataTypeSelector,
    DataPreviewTable,
    UploadProgress,
    UploadSuccess,
    ColumnMappingComponent,
    OcrSuccess,
    DocumentTypeSelector,
    DocumentValidation,
  ],
  templateUrl: './upload-center.html',
})
export class UploadCenterComponent {
  private router = inject(Router);

  // Global State
  activeTab = signal<'data' | 'document'>('data');

  // Data Tab State
  selectedDataType = signal<string>('');
  uploadedFile = signal<File | null>(null);
  previewData = signal<any[]>([]);
  previewColumns = signal<string[]>([]);
  totalRows = signal<number>(0);
  progress = signal(0);
  validationResult = signal<ValidationResult | null>(null);
  private uploadService = inject(UploadService);
  selectedDocType = signal<string>('');
  uploadStep = signal<'initial' | 'preview' | 'processing' | 'success'>('initial');


  // document Tab state
  ocrStep = signal<'initial' | 'validating' | 'validated' | 'processing' | 'success'>('initial');


  onFileSelected(file: File) {
    this.uploadedFile.set(file);

    if (this.activeTab() === 'data') {
      // The parser handles setting the 'preview' step after data is ready.
      this.parseExcelFile(file);
    } else {
      // OCR Logic
      if (this.selectedDocType()) {
        this.runValidation(file, this.selectedDocType());
      }
    }
  }

  private parseExcelFile(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

        if (data && data.length > 0) {
          this.previewColumns.set(data[0]);

          const rows = data.slice(1, 6).map((row) => {
            let obj: any = {};
            data[0].forEach((key: string, i: number) => {
              obj[key] = row[i];
            });
            return obj;
          });

          this.previewData.set(rows);
          this.totalRows.set(data.length - 1);

          this.uploadStep.set('preview');
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Failed to parse file. Please check format.');
      }
    };

    reader.readAsBinaryString(file);
  }

  runDataAnalysis() {
    console.log(`Running analysis for type: ${this.selectedDataType()}`);

    this.uploadStep.set('processing');
    this.progress.set(0);

    const interval = setInterval(() => {
      this.progress.update(p => p + 5);
      if (this.progress() >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.uploadStep.set('success');
        }, 600);
      }
    }, 150);
  }
  // --- DOCUMENT OCR LOGIC ---
  handleDocumentUpload(file: File) {
    this.ocrStep.set('validating');
    // Simulate validation delay
    setTimeout(() => {
      this.ocrStep.set('validated');
    }, 1500);
  }

  onDocTypeSelected(typeId: string) {
    this.selectedDocType.set(typeId);
    const file = this.uploadedFile();
    if (file) {
      this.runValidation(file, typeId);
    }
  }

  private runValidation(file: File, typeId: string) {
    this.validationResult.set({ status: 'validating' });

    this.uploadService.validateDocument(file, typeId).subscribe({
      next: (result) => {
        this.validationResult.set(result);
      },
      error: (err) => {
        console.error('Validation failed', err);
        this.validationResult.set({ status: 'mismatch', confidence: 0 });
      },
    });
  }

  runDocumentAnalysis() {
    this.ocrStep.set('processing');
    this.progress.set(0);

    const interval = setInterval(() => {
      this.progress.update((p) => p + 5);
      if (this.progress() >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.ocrStep.set('success');
        }, 600);
      }
    }, 100);
  }

  analysisButtonLabel = computed(() => {
    const type = this.selectedDataType();
    switch (type) {
      case 'payment': return 'Run Payment Analysis';
      case 'financial': return 'Run Financial Analysis';
      case 'identity': return 'Run Identity Analysis';
      case 'compliance': return 'Run Compliance Analysis';
      default: return 'Run Analysis';
    }
  });

  // --- SHARED UTILS ---
  reset() {
    this.uploadStep.set('initial');
    this.ocrStep.set('initial');
    this.uploadedFile.set(null);
    this.validationResult.set(null);
    this.progress.set(0);
    this.previewData.set([]);
  }

  viewReport() {
    this.router.navigate(['/fraud']);
  }

  setTab(tab: 'data' | 'document') {
    this.activeTab.set(tab);
    this.reset();
  }
}
