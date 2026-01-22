export interface ProfileSummaryData {
  details: {
    idNumber: string;
    age: string;
    gender: string;
    region: string;
    role: string;
    category: string;
    anomaliesDetected: number;
  };
  status: {
    fraudScore: number;
    totalAnomalies: number;
    documentStatus: 'Mismatch' | 'Verified' | 'Pending';
    ocrConfidence: number;
  };
}