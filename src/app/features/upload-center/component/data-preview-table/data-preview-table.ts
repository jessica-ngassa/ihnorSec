import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface TableRow {
  [key: string]: any;
}

@Component({
  selector: 'app-data-preview-table',
  imports: [CommonModule, LucideAngularModule],
  standalone: true,
  templateUrl: './data-preview-table.html',
  styleUrl: './data-preview-table.scss',
})
export class DataPreviewTable {
  data = input<TableRow[]>([]);
  columns = input<string[]>([]);
  totalRows = input<number>(0);
  
  remove = output<void>();
  cancel = output<void>();
  runAnalysis = output<void>();
}
