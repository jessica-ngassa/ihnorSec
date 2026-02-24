import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface OCRResult {
  bbox: number[][];
  text: string;
  confidence: number;
}

@Component({
  selector: 'app-ocr-success',
  standalone: true,
  imports: [CommonModule, LucideAngularModule,],
  templateUrl: './ocr-success.html',
  styleUrl: './ocr-success.scss',
})
export class OcrSuccess {
  ocrResults = input.required<OCRResult[]>();
  fileName = input<string>('document.pdf');

  uploadMore = output<void>();
  viewReport = output<void>();
}
