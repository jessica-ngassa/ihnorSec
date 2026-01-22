// export interface FraudCase {
//   id: number;
//   recordType: 'identity' | 'payment' | 'compliance';
//   name: string;
//   subText?: string;
//   idNumber: string;
//   referenceId?: string;
//   region?: string;
//   role?: string;
//   paymentData?: {
//     expectedAmount: number;
//     actualAmount: number;
//     variance: number;
//     variancePercentage: number;
//   };

//   fraudScore: number;
//   anomalies: number;
//   status: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Clean';
//   documentMatched: boolean;
// }

// export interface FraudCase {
//   id: string | number;
//   idNumber?: string;
//   recordType?: 'identity' | 'payment' | 'compliance';
//   name: string;
//   fraudScore: number;
//   status: string;
//   documentImage?:string;
//   ocrData?: {
//     name: string;
//     dob: string;
//     idNumber: string;
//     issueDate: string;
//     expiryDate: string;
//     address: string;
//     confidence: number;
//   };

//   systemData?: {
//     name: string;
//     idNumber: string;
//     dateOfBirth: string;
//     region?: string;
//   };

//   paymentData?: {
//     transactionId: string;
//     paymentDate: string;
//     department: string;
//     paymentType: string;
//     approvedBy: string;
//     reference: string;
//     recipientName: string;
//     expectedAmount: number;
//     actualAmount: number;
//     variance: number;
//     variancePercentage: number;
//     previousPayments: number;
//     averagePayment?: number;
//   };

//   complianceData?: {
//     recordId: string;
//     date: string;
//     location: string;
//     processStep: string;
//     performedBy: string;
//     deviationType: string;
//     impact: string;
//     expectedProcedure: string;
//     actualProcedure: string;
//     expectedMeasurement?: string;
//     measurement?: string;
//     industry: string;
//   };

//   anomalies: {
//     id: string;
//     title: string;
//     description: string;
//     severity: 'High' | 'Medium' | 'Low';
//     type?: string;
//     details?: string;
//   }[];

//   documentMatched?: boolean;
// }


// src/app/shared/model/fraud-case.model.ts

export interface FraudCase {
  id: string | number;
  recordType: 'identity' | 'payment' | 'compliance';
  name: string;
  idNumber: string; // Used as primary ID for list view
  fraudScore: number;
  status: string;
  documentMatched: boolean;
  documentImage?: string; // For Identity cases

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

  // Compliance Specific (New)
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
