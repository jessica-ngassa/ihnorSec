import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FraudCase } from '../../model/fraud-case.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  data = input.required<FraudCase[]>();
  columns = input.required<{key: string, label: string, width?: string, align?: string}[]>();
  actionClicked = output<{type: string, row: any}>();

  formatCaseId(id: string | number): string {
    return `CASE-2024-${String(id).padStart(3, '0')}`;
  }

  getRiskBadgeColor(score: number): string {
    if (score >= 90) return 'bg-red-100 text-red-700 border-red-100';
    if (score >= 70) return 'bg-orange-100 text-orange-700 border-orange-100';
    return 'bg-green-100 text-green-700 border-green-100';
  }

  getRiskLabel(score: number): string {
    if (score >= 90) return 'High';
    if (score >= 70) return 'Medium';
    return 'Low';
  }

  getUnit(row: FraudCase): string {
    if (row.systemData?.region) return row.systemData.region;
    if (row.paymentData?.department) return row.paymentData.department;
    if (row.complianceData?.industry) return row.complianceData.industry;
    return 'Unknown';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Unassigned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Under Investigation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
}
