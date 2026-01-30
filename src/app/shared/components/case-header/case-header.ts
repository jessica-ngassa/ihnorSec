import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './case-header.html',
  styleUrl: './case-header.scss'
})
export class CaseHeader {
  @Input() caseName: string = '';
  @Input() caseStatus: string = '';
  @Input() recordType: string = '';
  @Input() caseId: string = '';
  @Input() idNumber: string = '';
  @Input() assignedTo: string = '';
  @Input() amount: string = '';
  @Input() riskScore: number = 0;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/fraud']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Unassigned': return 'bg-gray-100 text-gray-700';
      case 'Under Investigation': return 'bg-blue-100 text-blue-700';
      case 'Escalated': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  getRiskScoreColor(): string {
    if (this.riskScore >= 90) return 'bg-red-100 text-red-700';
    if (this.riskScore >= 70) return 'bg-orange-100 text-orange-700';
    return 'bg-yellow-100 text-yellow-700';
  }
}
