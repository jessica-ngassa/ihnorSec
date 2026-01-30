export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  lastGenerated: string;
  format: 'PDF' | 'Excel' | 'PDF + Excel' | 'PDF + CSV';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  agencyId?: string;
}

export interface AuditLog {
  timestamp: string;
  user: string;
  action: string;
  object: string;
  result: string;
  ip: string;
  device: string;
}

export interface ReportPreview {
  title: string;
  agency: string;
  period: string;
  summary: string;
  metrics: {
    casesFlagged: number;
    highRisk: number;
    amountAtRisk: number;
    currency: string;
  };
}