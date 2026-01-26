import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-upload-success',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './upload-success.html',
  styleUrl: './upload-success.scss',
})
export class UploadSuccess {
  uploadMore = output<void>();
  viewReport = output<void>();
}
