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
  accept = input<string>('.csv,.xlsx,.xls');
  disabled = input<boolean>(false);

  fileSelected = output<File>();
  isDragging = signal(false);

  // ViewChild reference not strictly needed if we use template variable in method
  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled()) {
      this.isDragging.set(true);
    }
  }

  onDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging.set(false);

    if (this.disabled()) return;

    if (e.dataTransfer?.files.length) {
      this.fileSelected.emit(e.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      this.fileSelected.emit(event.target.files[0]);
      // Reset input value so same file can be selected again if needed
      event.target.value = '';
    }
  }
}
