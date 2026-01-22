import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export interface ComparisonRow {
  field: string;
  expected?: any;
  actual?: any;
  system?: any;
  doc?: any;
  match: boolean;
  isMissing?: boolean;
}

@Component({
  selector: 'app-comparison-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './comparison-table.html',
  styleUrl: './comparison-table.scss'
})
export class ComparisonTable {
  @Input() title: string = 'Data Comparison';
  @Input() data: ComparisonRow[] = [];
  @Input() leftColumnLabel: string = 'Expected';
  @Input() rightColumnLabel: string = 'Actual';
  @Input() formatFunction?: (value: any, field: string) => string;

  formatValue(value: any, field: string): string {
    if (this.formatFunction) {
      return this.formatFunction(value, field);
    }
    return value?.toString() || '';
  }
}