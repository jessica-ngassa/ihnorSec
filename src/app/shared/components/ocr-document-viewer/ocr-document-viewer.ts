import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { OcrResult } from '../../model/ocr-data.interface';

@Component({
  selector: 'app-ocr-document-viewer',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './ocr-document-viewer.html',
  styleUrl: './ocr-document-viewer.scss',
})
export class OcrDocumentViewer {

  imageSrc = input.required<string>();
  data = input.required<any>(); // Replace 'any' with OcrResult interface

  // Signals for local state
  zoomLevel = signal(100);
  rotation = signal(0);

  // Computed style string
  transformStyle = computed(() => {
    return `scale(${this.zoomLevel() / 100}) rotate(${this.rotation()}deg)`;
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
}
