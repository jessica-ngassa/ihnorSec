import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div 
        class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        [style.width.%]="progress"
        [class.animate-pulse]="isIndeterminate">
      </div>
    </div>
    <div class="text-sm text-gray-600 text-center" *ngIf="label">
      {{ label }}
    </div>
  `
})
export class ProgressLoader {
  @Input() progress: number = 0;
  @Input() label: string = '';
  @Input() isIndeterminate: boolean = false;
}