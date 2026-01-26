import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LucideAngularModule } from 'lucide-angular';
import { TableColumn } from '../../model/tableColumn';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzTagModule, NzButtonModule, LucideAngularModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {

  // data = input.required<any[]>();
  // columns = input.required<TableColumn[]>();

  // actionClicked = output<{type: string, row: any}>();

  // getStatusColor(status: string): string {
  //   const colors: Record<string, string> = {
  //     'High Risk': 'error',
  //     'Medium Risk': 'warning',
  //     'Low Risk': 'processing',
  //     'Clean': 'success'
  //   };
  //   return colors[status] || 'default';
  // }

  data = input.required<any[]>();
  columns = input.required<TableColumn[]>();
  actionClicked = output<{type: string, row: any}>();

  getStatusColor(status: string): string {
    switch (status) {
      case 'High Risk': return 'error';
      case 'Medium Risk': return 'warning';
      case 'Low Risk': return 'processing';
      case 'Clean': return 'success';
      default: return 'default';
    }
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  }
}
