export interface OcrResult {
  name: string;
  dob: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  address: string;
  confidence: number;
}