import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-loader.html',
  styleUrl: './progress-loader.scss',
})
export class ProgressLoader {
  @Input() progress: number = 0;
  @Input() label: string = '';
  @Input() isIndeterminate: boolean = false;
}
