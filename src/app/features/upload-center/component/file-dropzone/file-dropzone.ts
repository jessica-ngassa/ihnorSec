import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-file-dropzone',
  imports: [CommonModule, LucideAngularModule],
  standalone: true,
  templateUrl: './file-dropzone.html',
  styleUrl: './file-dropzone.scss',
})
export class FileDropzone {
  supportedFormats = input<string>('Supported formats: CSV, XLSX, XLS (Max 50MB)');
  disabled = input<boolean>(false);
  fileSelected = output<File>();
  isDragging = signal(false);

  onDragOver(e: DragEvent) {
    e.preventDefault();
    if (!this.disabled()) {
      this.isDragging.set(true);
    }
  }

  onDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(false);
    if (!this.disabled() && e.dataTransfer?.files.length) {
      this.fileSelected.emit(e.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    if (!this.disabled() && event.target.files.length) {
      this.fileSelected.emit(event.target.files[0]);
    }
  }

}
