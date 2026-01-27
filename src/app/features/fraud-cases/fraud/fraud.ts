import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from "lucide-angular";
import { toSignal } from '@angular/core/rxjs-interop';

import { TableFilter } from '../../../shared/table-filter/table-filter';
import { FraudService } from '../../../shared/services/fraud.service';
import { DataTable } from "../../../shared/components/data-table/data-table";

@Component({
  selector: 'app-fraud',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TableFilter, FormsModule, DataTable],
  templateUrl: './fraud.html',
  styleUrl: './fraud.scss',
})
export class Fraud {

  private fraudService = inject(FraudService);
  private router = inject(Router);

  isFilterVisible = signal(false);
  searchValue = signal('');
  activeFilters = signal({ range: [0, 100], status: 'All' });

  // Fetch Data
  rawFraudData = toSignal(this.fraudService.getFraudCases(), { initialValue: [] });

  // Filter Logic
  filteredData = computed(() => {
    const data = this.rawFraudData();
    const search = this.searchValue().toLowerCase();

    return data.filter(item => {
      const matchesSearch = search === '' ||
        item.name.toLowerCase().includes(search) ||
        item.idNumber.toLowerCase().includes(search);
      return matchesSearch;
    });
  });

  // --- Visual Helpers (Matching New Design) ---

  // Formats ID like "CASE-2024-001"
  formatCaseId(id: string | number): string {
    return `CASE-2024-${String(id).padStart(3, '0')}`;
  }

  // Get the Unit/Department based on record type
  getUnit(row: any): string {
    if (row.paymentData) return row.paymentData.department;
    if (row.systemData) return row.systemData.region;
    if (row.complianceData) return row.complianceData.industry;
    return 'General';
  }

  // Risk Badge Color (Red/Orange background)
  getRiskBadgeColor(score: number): string {
    if (score >= 90) return 'bg-red-100 text-red-700 border-red-100'; // High
    if (score >= 70) return 'bg-orange-100 text-orange-700 border-orange-100'; // Medium
    return 'bg-green-100 text-green-700 border-green-100'; // Low
  }

  getRiskLabel(score: number): string {
    if (score >= 90) return 'High';
    if (score >= 70) return 'Medium';
    return 'Low';
  }

  // Status Badge Color (Yellows)
  getStatusColor(status: string): string {
    switch (status) {
      case 'Unassigned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Under Investigation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  handleAction(id: string | number) {
    this.router.navigate(['/fraud', id]);
  }

  onFilterUpdate(event: any) {
    this.activeFilters.set(event);
  }

  tableColumns = [
    { key: 'caseId', label: 'Case ID', width: 'w-32' },
    { key: 'person', label: 'Person/Entity' },
    { key: 'risk', label: 'Risk', width: 'w-32' },
    { key: 'fraudTypes', label: 'Fraud Types' },
    { key: 'unit', label: 'Unit' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions', align: 'center' }
  ];

  exportToExcel() {
    const data = this.filteredData();
    const worksheet = data.map(row => ({
      'Case ID': this.formatCaseId(row.id),
      'Person/Entity': row.name,
      'ID Number': row.idNumber,
      'Risk Score': row.fraudScore,
      'Risk Level': this.getRiskLabel(row.fraudScore),
      'Fraud Type': row.anomalies[0]?.title || 'Anomaly',
      'Unit': this.getUnit(row),
      'Assigned To': row.assignedTo || 'Unassigned',
      'Status': row.status
    }));
    
    const csvContent = this.convertToCSV(worksheet);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fraud-cases-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any[]): string {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(item => 
      headers.map(header => `"${String(item[header]).replace(/"/g, '""')}"`).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  }
}
