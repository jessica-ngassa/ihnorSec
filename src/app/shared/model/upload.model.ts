export interface DocumentTypeConfig {
  id: string;
  label: string;
  icon: string; // credit-card | file-text |
  color?: string; // blue | green | purple | orange
  description?: string;
}

export interface ColumnMapping {
  sourceColumn: string;
  targetField: string;
  confidence: 'auto' | 'manual'; // To style the badge
}
