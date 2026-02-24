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
import { UploadService, JobStatusResponse } from '../../shared/services/upload.service';
import { ColumnMappingComponent } from './component/column-mapping/column-mapping';
import * as XLSX from 'xlsx';
import { DocumentTypeSelector } from './component/import-document/document-type-selector/document-type-selector';
import { DocumentValidation } from './component/import-document/document-validation/document-validation';
import { ValidationResult } from '../../shared/model/documentation-validation';
import { TranslationService } from '../../shared/services/translation.service';

interface OCRResult {
  bbox: number[][];
  text: string;
  confidence: number;
}

interface OCRResponse {
  results: OCRResult[];
  num_detections: number;
  language: string;
  backend: string;
}

interface Job {
  id: string;
  status: 'PREPARING' | 'UPLOADING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  fileName: string;
  type: 'DATA' | 'OCR';
  createdAt: Date;
}

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
  translationService = inject(TranslationService);
  private uploadService = inject(UploadService);

  // Global State
  activeTab = signal<'data' | 'document'>('data');

  // Job Tracking State
  activeJobs = signal<Job[]>([]);
  isJobActive = computed(() => this.activeJobs().length > 0);

  // Data Tab State
  selectedDataType = signal<string>('');
  uploadedFile = signal<File | null>(null);
  previewData = signal<any[]>([]);
  previewColumns = signal<string[]>([]);
  totalRows = signal<number>(0);
  progress = signal(0);
  validationResult = signal<ValidationResult | null>(null);
  selectedDocType = signal<string>('');
  uploadStep = signal<'initial' | 'preview' | 'processing' | 'success'>('initial');

  ocrResults = signal<OCRResult[]>([]);
  imagePreviewUrl = signal<string>('');

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

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);

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

    const file = this.uploadedFile();
    if (!file) return;

    const language = 'en'; // Or from a settings signal

    // Create and track job
    const jobId = this.generateJobId();
    const job: Job = {
      id: jobId,
      status: 'PREPARING',
      progress: 0,
      fileName: file.name,
      type: 'OCR',
      createdAt: new Date()
    };
    this.addJob(job);

    this.uploadService.runDocumentAnalysis(file, language).subscribe({
      next: (jobStatus) => {
        this.updateJobStatus(jobId, jobStatus);

        switch (jobStatus.status) {
          case 'UPLOADING':
            this.progress.set(25);
            this.updateJobProgress(jobId, 25, 'UPLOADING');
            break;
          case 'PROCESSING':
            this.progress.set(50);
            this.updateJobProgress(jobId, 50, 'PROCESSING');
            break;
          case 'COMPLETED':
            if (jobStatus.result?.results) {
              this.ocrResults.set(jobStatus.result.results);
              this.progress.set(100);
              this.updateJobProgress(jobId, 100, 'COMPLETED');
              setTimeout(() => {
                this.ocrStep.set('success');
              }, 600);
            }
            break;
          case 'FAILED':
            console.error('OCR failed:', jobStatus.error_message);
            this.progress.set(0);
            this.updateJobProgress(jobId, 0, 'FAILED');
            this.ocrStep.set('initial');
            break;
        }
      },
      error: (err) => {
        console.error('Analysis failed', err);
        this.progress.set(0);
        this.updateJobProgress(jobId, 0, 'FAILED');
        this.ocrStep.set('initial');
      }
    });
  }

  // Job Management Methods
  private generateJobId(): string {
    return `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private addJob(job: Job): void {
    this.activeJobs.update(jobs => [...jobs, job]);
  }

  private updateJobStatus(jobId: string, jobStatus: JobStatusResponse): void {
    this.activeJobs.update(jobs =>
      jobs.map(job =>
        job.id === jobId
          ? { ...job, status: jobStatus.status as any }
          : job
      )
    );
  }

  private updateJobProgress(jobId: string, progress: number, status: Job['status']): void {
    this.activeJobs.update(jobs =>
      jobs.map(job =>
        job.id === jobId
          ? { ...job, progress, status }
          : job
      )
    );
  }

  navigateToPipelineStatus(): void {
    // Navigate to pipeline status page
    // You can use route params to show which jobs are active
    this.router.navigate(['/upload/pipeline-status'], {
      state: { activeJobs: this.activeJobs() }
    });
  }

  // runDocumentAnalysis() {
  //   this.ocrStep.set('processing');
  //   this.progress.set(0);

  //   const file = this.uploadedFile();
  //   if (!file) return;

  //   this.uploadService.uploadImage(file).subscribe({
  //     next: (uploadResponse) => {
  //       this.uploadService.processOCR(uploadResponse.url).subscribe({
  //         next: (response: OCRResponse) => {
  //           this.ocrResults.set(response.results);
  //           this.progress.set(100);
  //           setTimeout(() => {
  //             this.ocrStep.set('success');
  //           }, 600);
  //         },
  //         error: (err: any) => {
  //           console.error('OCR failed', err);
  //           this.progress.set(0);
  //           this.ocrStep.set('initial');
  //         }
  //       });
  //     },
  //     error: (err: any) => {
  //       console.error('Upload failed', err);
  //       this.progress.set(0);
  //       this.ocrStep.set('initial');
  //     }
  //   });
  // }

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
    this.ocrResults.set([]);
    this.imagePreviewUrl.set('');
  }

  viewReport() {
    this.router.navigate(['/fraud']);
  }

  setTab(tab: 'data' | 'document') {
    this.activeTab.set(tab);
    this.reset();
  }
}
