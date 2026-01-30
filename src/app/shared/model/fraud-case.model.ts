export interface FraudCase {
  id: string | number;
  caseId?: string;
  recordType: 'identity' | 'payment' | 'compliance';
  name: string;
  idNumber: string;
  fraudScore: number;
  status: string;
  documentMatched: boolean;
  documentImage?: string;
  assignedTo?: string;
  assignedDate?: string;
  amount?: number;
  unit?: string;
  timeline?: {
    date: string;
    user: string;
    action: string;
    type: string;
    details: string;
  }[];

  // Identity Specific
  systemData?: {
    name: string;
    idNumber: string;
    dateOfBirth: string;
    region: string;
  };
  ocrData?: {
    name: string;
    dob: string;
    idNumber: string;
    issueDate: string;
    expiryDate: string;
    address: string;
    confidence: number;
    documentImage?: string;
  };

  // Payment Specific
  paymentData?: {
    reference: string;
    transactionId: string;
    paymentDate: string;
    department: string;
    paymentType: string;
    approvedBy: string;
    paymentMethod: string;
    recipientName: string;
    expectedAmount: number;
    actualAmount: number;
    variance: number;
    variancePercentage: number;
    previousPayments: number;
    averagePayment?: number;
  };

  // Compliance Specific
  complianceData?: {
    recordId: string;
    date: string;
    location: string;
    industry: string;
    processStep: string;
    performedBy: string;
    deviationType: string;
    impact: string;
    expectedProcedure: string;
    actualProcedure: string;
    expectedMeasurement?: string;
    measurement?: string;
  };

  anomalies: {
    id: string;
    title: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
  }[];
}
