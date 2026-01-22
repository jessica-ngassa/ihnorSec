import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface DashboardKPI {
  label: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
  desc: string;
}

export interface RiskAssessmentData {
  highRiskCases: number;
  totalAnalyzed: number;
  riskScore: number;
}

export interface AnalysisTypeData {
  document: number;
  payment: number;
  compliance: number;
}

export interface TemplateMatchingData {
  perfect: number;
  high: number;
  mismatch: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getDashboardStats(): Observable<DashboardKPI[]> {
    return of([
      { label: 'Total Records Analyzed', value: '12,847', icon: 'users', color: 'blue', desc: 'Identity & payment records' },
      { label: 'Analysis Completed', value: '247', icon: 'bar-chart-3', color: 'purple', desc: 'With risk assessment' },
      { label: 'Documents Processed', value: '3,891', icon: 'file-check', color: 'green', desc: 'OCR & template matching' },
      { label: 'High-Risk Cases', value: '89', icon: 'shield-alert', color: 'orange', desc: 'Requiring investigation' }
    ] as DashboardKPI[]).pipe(delay(500));
  }

  getRiskAssessment(): Observable<RiskAssessmentData> {
    return of({
      highRiskCases: 89,
      totalAnalyzed: 247,
      riskScore: 36.0
    }).pipe(delay(600));
  }

  getAnalysisBreakdown(): Observable<AnalysisTypeData> {
    return of({
      document: 54,
      payment: 30,
      compliance: 16
    }).pipe(delay(700));
  }

  getTemplateMatchingStats(): Observable<TemplateMatchingData> {
    return of({
      perfect: 83.4,
      high: 11.7,
      mismatch: 4.9
    }).pipe(delay(700));
  }
}
