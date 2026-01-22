import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-organizational-health',
  imports: [CommonModule, LucideAngularModule],
  standalone: true,
  templateUrl: './organizational-health.html',
  styleUrl: './organizational-health.scss',
})
export class OrganizationalHealth {
  @Input() highRiskCases = 0;
  @Input() totalCases = 0;

  readonly circumference = 2 * Math.PI * 56; // r=56

  highRiskPercentage = computed(() => {
    return this.totalCases > 0
      ? ((this.highRiskCases / this.totalCases) * 100).toFixed(1)
      : '0.0';
  });

  strokeDashoffset = computed(() => {
    const percent = parseFloat(this.highRiskPercentage());
    return this.circumference - (percent / 100) * this.circumference;
  });

  healthStatus = computed(() => {
    const percent = parseFloat(this.highRiskPercentage());

    if (percent < 15) {
      return {
        label: 'Excellent',
        borderColor: 'border-green-200',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        barColor: 'bg-green-500',
        hexColor: '#10B981',
        message: 'Your organization shows excellent fraud prevention health with minimal high-risk cases.'
      };
    } else if (percent < 30) {
      return {
        label: 'Good',
        borderColor: 'border-yellow-200',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        barColor: 'bg-yellow-500',
        hexColor: '#EAB308',
        message: 'Fraud detection is functioning well, but continued monitoring is recommended.'
      };
    } else {
      return {
        label: 'Needs Attention',
        borderColor: 'border-orange-200',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700',
        barColor: 'bg-orange-500',
        hexColor: '#F97316',
        message: 'Elevated high-risk case rate detected. Recommend immediate review of flagged cases.'
      };
    }
  });

}
