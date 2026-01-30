import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { AnomaliesDetected } from '../../../shared/components/anomalies-detected/anomalies-detected';
import { OcrDocumentViewer } from '../../../shared/components/ocr-document-viewer/ocr-document-viewer';
import { FraudService } from '../../../shared/services/fraud.service';
import { ComparisonTable } from '../../../shared/components/comparison-table/comparison-table';
import { CaseHeader } from '../../../shared/components/case-header/case-header';
import { CaseManagement } from '../../../shared/components/case-management/case-management';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { CaseActionModal } from '../../../shared/components/case-action-modal/case-action-modal';

@Component({
  selector: 'app-fraud-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AnomaliesDetected, OcrDocumentViewer, ComparisonTable, CaseHeader, CaseManagement, LoadingSpinner, CaseActionModal],
  templateUrl: './fraud-detail.html',
  styleUrl: './fraud-detail.scss',
})
export class FraudDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fraudService = inject(FraudService);

  // Tabs State
  activeTab = signal<'evidence' | 'ocr' | 'timeline'>('evidence');
  
  // Modal State
  modalOpen = signal(false);
  modalAction = signal<'reassign' | 'escalate' | 'close'>('reassign');

  fraudCase = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) throw new Error('No ID provided');
        return this.fraudService.getFraudCaseById(id);
      })
    )
  );

  // Computed Comparisons
  identityComparison = computed(() => {
    const data = this.fraudCase();
    if (!data?.ocrData || !data?.systemData) return [];
    return [
      { field: 'Full Name', system: data.systemData.name, doc: data.ocrData.name, match: data.systemData.name === data.ocrData.name },
      { field: 'ID Number', system: data.systemData.idNumber, doc: data.ocrData.idNumber, match: data.systemData.idNumber === data.ocrData.idNumber },
      { field: 'Date of Birth', system: data.systemData.dateOfBirth, doc: data.ocrData.dob, match: data.systemData.dateOfBirth === data.ocrData.dob },
      { field: 'Issue Date', system: '2020-05-15', doc: data.ocrData.issueDate, match: true } // Mock system date
    ];
  });

  // Helpers
  formatMoney(amount: number): string {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(amount) + ' FCFA';
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Unassigned': return 'bg-yellow-100 text-yellow-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  getRiskColor(score: number): string {
    if (score >= 90) return 'bg-red-100 text-red-700';
    if (score >= 70) return 'bg-orange-100 text-orange-700';
    return 'bg-green-100 text-green-700';
  }

  goBack() {
    this.router.navigate(['/fraud']);
  }

  // Sidebar Actions
  reassign() { 
    this.modalAction.set('reassign');
    this.modalOpen.set(true);
  }
  
  escalate() { 
    this.modalAction.set('escalate');
    this.modalOpen.set(true);
  }
  
  closeCase() { 
    this.modalAction.set('close');
    this.modalOpen.set(true);
  }

  onModalClose() {
    this.modalOpen.set(false);
  }

  onModalConfirm(data: any) {
    console.log('Action confirmed:', data);
    this.modalOpen.set(false);
    // Handle the action based on data.type
  }

  onDocumentLinked(file: File) {
    console.log('Document linked, calling backend OCR service:', file.name);
    // Here you would call your OCR service to process the new document
    // and update the fraud case data
  }
}
