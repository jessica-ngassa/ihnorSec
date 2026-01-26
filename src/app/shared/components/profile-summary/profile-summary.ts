import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile-summary',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './profile-summary.html',
  styleUrl: './profile-summary.scss',
})
export class ProfileSummary {
  data = input.required<any>();

  getFraudScoreColor(score: number): string {
    if (score >= 80) return 'red';
    if (score >= 60) return 'orange';
    return 'green';
  }

  getDocumentStatusColor(status: string): string {
    return status === 'Verified' ? 'green' : 'red';
  }
}
