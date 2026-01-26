// import { Component, inject, signal } from '@angular/core';
// import { FileDropzone } from "../../shared/components/file-dropzone/file-dropzone";
// import { ColumnMappingComponent } from "./component/column-mapping/column-mapping";
// import { LucideAngularModule } from "lucide-angular";
// import { toSignal } from '@angular/core/rxjs-interop';
// import { UploadService } from '../../shared/services/upload.service';
// import { CommonModule } from '@angular/common';
// import { ColumnMapping } from '../../shared/model/upload.model';

// @Component({
//   selector: 'app-upload-center',
//   imports: [CommonModule, FileDropzone, ColumnMappingComponent, LucideAngularModule],
//   standalone: true,
//   templateUrl: './upload-center.html',
//   styleUrl: './upload-center.scss',
// })
// export class UploadCenter {

//   private uploadService = inject(UploadService);

//   activeTab = signal<'data' | 'document'>('data');
//   uploadedFile = signal<File | null>(null);
//   isAnalyzing = signal(false);

//   // 1. Fetch Doc Types from Backend (Signal)
//   docTypes = toSignal(this.uploadService.getDocumentTypes(), { initialValue: [] });
//   selectedDocType = signal<string>('cni');

//   // 2. Store Mappings from Backend - Initialize with sample data
//   columnMappings = signal<ColumnMapping[]>([
//     { sourceColumn: 'NOM_COMPLET', targetField: 'full_name', confidence: 'auto' },
//     { sourceColumn: 'NIF', targetField: 'id_number', confidence: 'auto' },
//     { sourceColumn: 'DATE_NAISSANCE', targetField: 'date_of_birth', confidence: 'auto' },
//     { sourceColumn: 'MONTANT', targetField: 'payment_amount', confidence: 'manual' }
//   ]);

//   // File requirements
//   fileRequirements = [
//     'First row must contain column headers',
//     'Required fields: full_name, id_number, payment_amount',
//     'Date format: YYYY-MM-DD or DD/MM/YYYY',
//     'UTF-8 encoding recommended for special characters'
//   ];

//   // Handle File Selection
//   handleFile(file: File) {
//     this.uploadedFile.set(file);

//     // If we are on the Data tab, fetch mappings immediately
//     if (this.activeTab() === 'data') {
//       this.isAnalyzing.set(true);
//       this.uploadService.analyzeFileColumns(file).subscribe({
//         next: (mappings) => {
//           this.columnMappings.set(mappings);
//           this.isAnalyzing.set(false);
//         },
//         error: (err) => {
//           console.error(err);
//           this.isAnalyzing.set(false);
//         }
//       });
//     }
//   }

//   setTab(tab: 'data' | 'document') {
//     this.activeTab.set(tab);
//     this.uploadedFile.set(null);
//     this.columnMappings.set([]); // Reset mappings on tab switch
//   }
// }



import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { FileDropzone } from './component/file-dropzone/file-dropzone';
import { DataTypeSelector } from './component/data-type-selector/data-type-selector';
import { UploadProgress } from './component/upload-progress/upload-progress';
import { DataPreviewTable } from './component/data-preview-table/data-preview-table';
import { UploadSuccess } from './component/upload-success/upload-success';
import { toSignal } from '@angular/core/rxjs-interop';
import { UploadService } from '../../shared/services/upload.service';
import { ColumnMapping } from '../../shared/model/upload.model';
import { ColumnMappingComponent } from './component/column-mapping/column-mapping';
import * as XLSX from 'xlsx';


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
    ColumnMappingComponent
  ],
 templateUrl: './upload-center.html',
})
export class UploadCenterComponent {
   private uploadService = inject(UploadService);
  // State Management
  activeTab = signal<'data' | 'document'>('data');
  uploadStep = signal<'initial' | 'preview' | 'processing' | 'success'>('initial');
  uploadedFile = signal<File | null>(null);
  isAnalyzing = signal(false);

  selectedDataType = signal<string>('');
  progress = signal(0);

  // Excel data
  previewData = signal<any[]>([]);
  previewColumns = signal<string[]>([]);
  totalRows = signal<number>(0);


  private router = inject(Router);

  // Flow State: 'initial' -> 'preview' -> 'processing' -> 'success'

  // Data

    // 1. Fetch Doc Types from Backend (Signal)
  docTypes = toSignal(this.uploadService.getDocumentTypes(), { initialValue: [] });
  selectedDocType = signal<string>('cni');

  // 1. User Selects Type (Step 1)
  onTypeSelected(type: string) {
    this.selectedDataType.set(type);
  }

  // 2. User Drops File (Move to Step 2)
  // onFileSelected(file: File) {
  //   if (this.selectedDataType()) {
  //     this.uploadStep.set('preview');
  //   } else {
  //     alert('Please select a data type first!');
  //   }
  // }

  // // 3. User Clicks Run Analysis (Move to Step 3 -> 4)
  // runAnalysis() {
  //   this.uploadStep.set('processing');
  //   this.progress.set(0);

  //   // Simulate Backend Process
  //   const interval = setInterval(() => {
  //     this.progress.update(p => p + 10);
  //     if (this.progress() >= 100) {
  //       clearInterval(interval);
  //       setTimeout(() => {
  //         this.uploadStep.set('success');
  //       }, 500);
  //     }
  //   }, 300);
  // }

  // Reset Flow
  // reset() {
  //   this.uploadStep.set('select');
  //   this.selectedDataType.set(null);
  //   this.progress.set(0);
  // }

  // viewReport() {
  //   // navigate to analysis results
  //   console.log('Navigating to results...');
  // }

    // 2. Store Mappings from Backend - Initialize with sample data
  columnMappings = signal<ColumnMapping[]>([
    { sourceColumn: 'NOM_COMPLET', targetField: 'full_name', confidence: 'auto' },
    { sourceColumn: 'NIF', targetField: 'id_number', confidence: 'auto' },
    { sourceColumn: 'DATE_NAISSANCE', targetField: 'date_of_birth', confidence: 'auto' },
    { sourceColumn: 'MONTANT', targetField: 'payment_amount', confidence: 'manual' }
  ]);

    // File requirements
  fileRequirements = [
    'First row must contain column headers',
    'Required fields: full_name, id_number, payment_amount',
    'Date format: YYYY-MM-DD or DD/MM/YYYY',
    'UTF-8 encoding recommended for special characters'
  ];

    setTab(tab: 'data' | 'document') {
    this.activeTab.set(tab);
    this.uploadedFile.set(null);
    this.columnMappings.set([]); // Reset mappings on tab switch
  }

    // Handle File Selection
  handleFile(file: File) {
    this.uploadedFile.set(file);

    // If we are on the Data tab, fetch mappings immediately
    if (this.activeTab() === 'data') {
      this.isAnalyzing.set(true);
      this.uploadService.analyzeFileColumns(file).subscribe({
        next: (mappings) => {
          this.columnMappings.set(mappings);
          this.isAnalyzing.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isAnalyzing.set(false);
        }
      });
    }
  }



  /////////







  // 1. Handle File Selection (Moves from Initial -> Preview)
  onFileSelected(file: File) {
    this.parseExcelFile(file);
    this.uploadStep.set('preview');
  }

  // Parse Excel/CSV file
  private parseExcelFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 0) {
        const headers = jsonData[0] as string[];
        this.previewColumns.set(headers);

        // Convert rows to objects (show first 5 for preview)
        const dataRows = (jsonData.slice(1, 6) as any[][]).map((row: any[]) => {
          const rowObj: any = {};
          headers.forEach((header, index) => {
            rowObj[header] = row[index] || '';
          });
          return rowObj;
        });

        this.previewData.set(dataRows);
        this.totalRows.set(jsonData.length - 1);
      }
    };
    reader.readAsBinaryString(file);
  }

  // 2. Run Analysis (Moves from Preview -> Processing -> Success)
  runAnalysis() {
    this.uploadStep.set('processing');
    this.progress.set(0);

    // Simulate backend processing with the blue bar
    const interval = setInterval(() => {
      this.progress.update(p => p + 5);
      if (this.progress() >= 100) {
        clearInterval(interval);
        // Add a small delay at 100% before showing success
        setTimeout(() => {
          this.uploadStep.set('success');
        }, 600);
      }
    }, 150); // Speed of simulation
  }

  // 3. Navigation
  viewReport() {
    this.router.navigate(['/fraud']); // Navigates to your "Analysis Results" page
  }

  reset() {
    this.uploadStep.set('initial');
    this.progress.set(0);
  }


}
