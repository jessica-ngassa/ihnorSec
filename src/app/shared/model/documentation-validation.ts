export interface ValidationResult {
  status: 'validating' | 'match' | 'mismatch';
  confidence?: number;
  detectedType?: string;
}
