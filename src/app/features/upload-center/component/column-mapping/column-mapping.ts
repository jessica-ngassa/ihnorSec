import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ColumnMapping } from '../../../../shared/model/upload.model';

@Component({
  selector: 'app-column-mapping',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './column-mapping.html',
  styleUrl: './column-mapping.scss',
})
export class ColumnMappingComponent {
  mappings = input.required<ColumnMapping[]>();
}
