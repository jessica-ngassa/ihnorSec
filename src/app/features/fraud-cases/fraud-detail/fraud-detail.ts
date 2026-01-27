import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { AnomaliesDetected } from '../../../shared/components/anomalies-detected/anomalies-detected';
import { OcrDocumentViewer } from '../../../shared/components/ocr-document-viewer/ocr-document-viewer';
import { ProfileSummary } from '../../../shared/components/profile-summary/profile-summary';
import { FraudService } from '../../../shared/services/fraud.service';
import { ComparisonTable } from '../../../shared/components/comparison-table/comparison-table';

@Component({
  selector: 'app-fraud-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AnomaliesDetected, OcrDocumentViewer, ProfileSummary, ComparisonTable],
  templateUrl: './fraud-detail.html',
  styleUrl: './fraud-detail.scss',
})
export class FraudDetail {
private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fraudService = inject(FraudService);

  fraudCase = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) throw new Error('No ID provided');
        return this.fraudService.getFraudCaseById(id);
      })
    )
  );

  paymentComparison = computed(() => {
    const data = this.fraudCase();
    if (!data?.paymentData) return [];
    return [
      { field: 'Transaction ID', expected: data.paymentData.reference, actual: data.paymentData.transactionId, match: true },
      { field: 'Recipient Name', expected: data.paymentData.recipientName, actual: data.paymentData.recipientName, match: true },
      { field: 'Expected Amount', expected: data.paymentData.expectedAmount, actual: data.paymentData.actualAmount, match: false }
    ];
  });

  goBack() {
    this.router.navigate(['/fraud']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'High Risk': return 'border-red-200 bg-red-50 text-red-700';
      case 'Medium Risk': return 'border-orange-200 bg-orange-50 text-orange-700';
      case 'Low Risk': return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'Clean': return 'border-green-200 bg-green-50 text-green-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  }

  getRecordConfig = computed(() => {
    const data = this.fraudCase();
    if (!data) return null;

    const configs = {
      identity: {
        title: 'Identity Analysis',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
        summaryTitle: 'Profile Summary',
        summaryFields: [
          { label: 'ID Number', value: data.systemData?.idNumber },
          { label: 'Region', value: data.systemData?.region },
          { label: 'Total Anomalies', value: data.anomalies.length, highlight: true }
        ],
        comparisonData: this.identityComparison()
      },
      payment: {
        title: 'Payment Analysis',
        badgeClass: 'bg-green-100 text-green-800 border-green-200',
        summaryTitle: 'Payment Summary',
        summaryFields: [
          { label: 'Transaction ID', value: data.paymentData?.transactionId },
          { label: 'Expected Amount', value: this.formatMoney(data.paymentData?.expectedAmount || 0) },
          { label: 'Actual Amount', value: this.formatMoney(data.paymentData?.actualAmount || 0), highlight: true },
          { label: 'Variance', value: `+${data.paymentData?.variancePercentage}%`, highlight: true }
        ],
        comparisonData: this.paymentComparison()
      },
      compliance: {
        title: 'Compliance Analysis',
        badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
        summaryTitle: 'Compliance Summary',
        summaryFields: [
          { label: 'Process Step', value: data.complianceData?.processStep },
          { label: 'Location', value: data.complianceData?.location },
          { label: 'Total Anomalies', value: data.anomalies.length, highlight: true }
        ],
        comparisonData: this.complianceComparison()
      }
    };

    return configs[data.recordType as keyof typeof configs] || configs.identity;
  });

  formatForComparison = (value: any, field: string): string => {
    if (field.includes('Amount')) {
      return this.formatMoney(value);
    }
    return value?.toString() || '';
  };

  formatMoney(amount: string | number): string {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount) + ' XAF';
  }

  identityComparison = computed(() => {
    const data = this.fraudCase();
    if (!data?.ocrData || !data?.systemData) return [];
    return [
      { field: 'Name', system: data.systemData.name, doc: data.ocrData.name, match: data.systemData.name === data.ocrData.name },
      { field: 'ID Number', system: data.systemData.idNumber, doc: data.ocrData.idNumber, match: data.systemData.idNumber === data.ocrData.idNumber },
      { field: 'Date of Birth', system: data.systemData.dateOfBirth, doc: data.ocrData.dob, match: data.systemData.dateOfBirth === data.ocrData.dob },
      { field: 'Region', system: data.systemData.region || 'Missing', doc: data.ocrData.address, match: false, isMissing: !data.systemData.region }
    ];
  });

  complianceComparison = computed(() => {
    const data = this.fraudCase();
    if (!data?.complianceData) return [];
    return [
      { field: 'Process Step', expected: data.complianceData.processStep, actual: data.complianceData.processStep, match: true },
      { field: 'Expected Procedure', expected: data.complianceData.expectedProcedure, actual: data.complianceData.actualProcedure, match: false },
      { field: 'Measurement', expected: data.complianceData.expectedMeasurement, actual: data.complianceData.measurement, match: false }
    ];
  });
}
