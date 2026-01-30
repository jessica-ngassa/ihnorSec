import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';

export interface HighRiskCase {
  id: string | number;
  person: string;
  idNumber: string;
  riskScore: number;
  flagType: string;
  amount: number;
  dateDetected: string;
  status: string;
}

@Component({
  selector: 'app-recent-high-risk-detections',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NzButtonModule],
  templateUrl: './recent-high-risk-detections.html',
  styleUrl: './recent-high-risk-detections.scss'
})
export class RecentHighRiskDetections {
  @Input() cases: HighRiskCase[] = [];
  @Output() navigateToCase = new EventEmitter<string>();
  @Output() viewAllCases = new EventEmitter<void>();

  onCaseClick(caseId: string | number): void {
    this.navigateToCase.emit(caseId.toString());
  }

  onViewAllClick(): void {
    this.viewAllCases.emit();
  }

  getRiskScoreClass(score: number): string {
    if (score >= 90) return 'bg-red-100 text-red-600';
    if (score >= 80) return 'bg-orange-100 text-orange-600';
    return 'bg-yellow-100 text-yellow-600';
  }

  getRiskScoreBoldClass(score: number): string {
    if (score >= 90) return 'text-red-700';
    if (score >= 80) return 'text-orange-700';
    return 'text-yellow-700';
  }

  getFlagTypeClass(flagType: string): string {
    if (flagType.includes('Duplicate')) return 'bg-purple-100 text-purple-700';
    if (flagType.includes('Ghost')) return 'bg-red-100 text-red-700';
    if (flagType.includes('Identity')) return 'bg-orange-100 text-orange-700';
    return 'bg-blue-100 text-blue-700';
  }

  getStatusClass(status: string): string {
    if (status === 'Unassigned') return 'bg-gray-100 text-gray-700';
    if (status === 'Under Investigation') return 'bg-blue-100 text-blue-700';
    if (status === 'Escalated') return 'bg-orange-100 text-orange-700';
    return 'bg-green-100 text-green-700';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}