export interface DashboardStats {
  totalRecords: number;
  fraudCases: number;
  documentsProcessed: number;
  highRiskIndividuals: number;
}

export interface SectorData {
  id: string;
  name: string;
  count: number;
  icon: string;
  color: 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'indigo' | 'orange' | 'gray';
}
