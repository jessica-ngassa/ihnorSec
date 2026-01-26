import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-ocr-success',
  standalone: true,
  imports: [CommonModule, LucideAngularModule,],
  templateUrl: './ocr-success.html',
  styleUrl: './ocr-success.scss',
})
export class OcrSuccess {

  uploadMore = output<void>();
  viewReport = output<void>();
}
