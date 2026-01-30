export interface DetectionRule {
  id: string;
  name: string;
  category: 'Identity' | 'Payments' | 'Compliance' | 'Procurement';
  icon: string;
  enabled: boolean;
  threshold: number;
  thresholdType: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  config: Record<string, any>;
}

export interface RuleCategory {
  name: string;
  rules: DetectionRule[];
}