import { Injectable, signal } from '@angular/core';
import { ReportTemplate, AuditLog, ReportPreview } from '../model/reports.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private reportTemplates = signal<ReportTemplate[]>([]);
  private auditLogs = signal<AuditLog[]>([]);

  getReportTemplates(agencyId: string): ReportTemplate[] {
    const reportMap: Record<string, ReportTemplate[]> = {
      'ministry-finance': [
        {
          id: 'treasury-report',
          name: 'Treasury Fraud Detection',
          description: 'Monthly summary of payment fraud and duplicate transactions',
          frequency: 'Monthly',
          lastGenerated: '2024-01-01',
          format: 'PDF',
          riskLevel: 'High'
        },
        {
          id: 'budget-compliance',
          name: 'Budget Compliance Report',
          description: 'Expenditure verification and approval compliance',
          frequency: 'Weekly',
          lastGenerated: '2024-01-15',
          format: 'PDF + Excel',
          riskLevel: 'Medium'
        },
        {
          id: 'recovery-opportunities',
          name: 'Recovery Opportunities',
          description: 'Estimated amounts recoverable from fraud cases',
          frequency: 'Monthly',
          lastGenerated: '2024-01-01',
          format: 'Excel',
          riskLevel: 'Low'
        }
      ],
      'public-service': [
        {
          id: 'ghost-worker',
          name: 'Ghost Worker Detection',
          description: 'Monthly summary of suspected ghost workers and duplicates',
          frequency: 'Monthly',
          lastGenerated: '2024-01-01',
          format: 'PDF',
          riskLevel: 'High'
        },
        {
          id: 'payroll-anomalies',
          name: 'Payroll Anomalies',
          description: 'Salary discrepancies and payment irregularities',
          frequency: 'Weekly',
          lastGenerated: '2024-01-15',
          format: 'PDF + Excel',
          riskLevel: 'Medium'
        }
      ]
    };

    return reportMap[agencyId] || reportMap['ministry-finance'];
  }

  getAuditLogs(): AuditLog[] {
    return [
      {
        timestamp: '2024-01-21 14:32:15',
        user: 'Marie Diop',
        action: 'Case Status Updated',
        object: 'CASE-2024-001',
        result: 'Success',
        ip: '192.168.1.45',
        device: 'Windows Desktop'
      },
      {
        timestamp: '2024-01-21 14:15:22',
        user: 'Paul Koffi',
        action: 'Document Uploaded',
        object: 'DOC-2024-00142',
        result: 'Success',
        ip: '192.168.1.89',
        device: 'MacOS'
      },
      {
        timestamp: '2024-01-21 13:45:10',
        user: 'System',
        action: 'Fraud Detection Run',
        object: 'BATCH-2024-012',
        result: 'Success (14 cases flagged)',
        ip: '10.0.0.1',
        device: 'Server'
      },
      {
        timestamp: '2024-01-21 12:20:33',
        user: 'Marie Diop',
        action: 'Case Assigned',
        object: 'CASE-2024-002',
        result: 'Success',
        ip: '192.168.1.45',
        device: 'Windows Desktop'
      },
      {
        timestamp: '2024-01-21 11:05:44',
        user: 'Admin',
        action: 'Rule Threshold Updated',
        object: 'RULE-duplicate-payment',
        result: 'Success',
        ip: '192.168.1.100',
        device: 'Windows Desktop'
      }
    ];
  }

  getReportPreview(): ReportPreview {
    return {
      title: 'Monthly Risk Summary',
      agency: 'Ministry of Finance',
      period: '01-31 Jan 2024',
      summary: 'During January 2024, the system processed 12,450 records and flagged 47 high-risk cases...',
      metrics: {
        casesFlagged: 47,
        highRisk: 18,
        amountAtRisk: 124.5,
        currency: 'FCFA'
      }
    };
  }

  generateReport(templateId: string): void {
    // Simulate report generation
    console.log(`Generating report: ${templateId}`);
  }

  downloadReport(templateId: string): void {
    // Simulate report download
    console.log(`Downloading report: ${templateId}`);
  }
}