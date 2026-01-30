import { Component, computed, input, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { OcrResult } from '../../model/ocr-data.interface';
import { FileDropzone } from '../../../features/upload-center/component/file-dropzone/file-dropzone';

@Component({
  selector: 'app-ocr-document-viewer',
  imports: [LucideAngularModule, CommonModule, FileDropzone],
  templateUrl: './ocr-document-viewer.html',
  styleUrl: './ocr-document-viewer.scss',
})
export class OcrDocumentViewer {

  imageSrc = input.required<string>();
  data = input.required<any>();
  
  documentLinked = output<File>();
  showReUpload = signal(false);
  newDocument = signal<File | null>(null);
  currentImageSrc = signal<string>('');
  isProcessing = signal(false);
  processedData = signal<any>(null);
  isLinked = signal(false);

  zoomLevel = signal(100);
  rotation = signal(0);

  ngOnInit() {
    this.currentImageSrc.set(this.imageSrc());
  }

  transformStyle = computed(() => {
    return `scale(${this.zoomLevel() / 100}) rotate(${this.rotation()}deg)`;
  });

  displayImageSrc = computed(() => {
    return this.currentImageSrc() || this.imageSrc();
  });

  zoomIn() {
    this.zoomLevel.update(z => Math.min(z + 20, 200));
  }

  zoomOut() {
    this.zoomLevel.update(z => Math.max(z - 20, 50));
  }

  rotate() {
    this.rotation.update(r => (r + 90) % 360);
  }

  confirmField(field: string) {
    console.log('Confirmed:', field);
  }

  rejectField(field: string) {
    console.log('Rejected:', field);
  }

  reUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.png,.pdf';
    input.onchange = (e: any) => {
      if (e.target.files.length) {
        this.onFileUploaded(e.target.files[0]);
      }
    };
    input.click();
  }

  onFileUploaded(file: File) {
    this.newDocument.set(file);
    this.isLinked.set(false); // Reset linked state when new document uploaded
    const reader = new FileReader();
    reader.onload = (e) => {
      this.currentImageSrc.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  cancelReUpload() {
    this.showReUpload.set(false);
  }

  linkDocument() {
    const file = this.newDocument();
    if (file) {
      this.isProcessing.set(true);
      
      // Simulate processing delay
      setTimeout(() => {
        this.processedData.set({
          name: 'Marie Claire Dubois',
          dob: '1990-08-22',
          idNumber: 'FR-9876543',
          address: 'Paris, France',
          confidence: '96.8'
        });
        this.isProcessing.set(false);
        this.isLinked.set(true); // Mark as linked after processing
        this.newDocument.set(null); // Reset after processing
      }, 2000);
      
      this.documentLinked.emit(file);
    }
  }
}
