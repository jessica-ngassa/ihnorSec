import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { RuleCardComponent } from '../../../shared/components/rule-card/rule-card';
import { DetectionRule } from '../../../shared/model/detection-rule.interface';

@Component({
  selector: 'app-detection-rules',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NzSpinModule, RuleCardComponent],
  templateUrl: './detection-rules.html',
  styleUrl: './detection-rules.scss',
})
export class DetectionRules {
  loading = signal(false);
  rules = signal<DetectionRule[]>([
    {
      id: 'duplicate-identity',
      name: 'Duplicate Identity Detection',
      category: 'Identity',
      icon: 'users',
      enabled: true,
      threshold: 95,
      thresholdType: 'Similarity %',
      severity: 'High',
      description: 'Detects when the same identity appears multiple times in the system',
      config: {
        fuzzyMatching: true,
        photoComparison: false,
        crossDatabase: true
      }
    },
    {
      id: 'duplicate-payment',
      name: 'Duplicate Payment Detection',
      category: 'Payments',
      icon: 'dollar-sign',
      enabled: true,
      threshold: 100,
      thresholdType: 'Match %',
      severity: 'High',
      description: 'Flags when the same payment appears to be made multiple times',
      config: {
        sameRecipient: true,
        sameAmount: true,
        withinDays: 30
      }
    },
    {
      id: 'id-mismatch',
      name: 'ID Mismatch (OCR vs System)',
      category: 'Identity',
      icon: 'file-warning',
      enabled: true,
      threshold: 80,
      thresholdType: 'OCR Confidence',
      severity: 'High',
      description: 'Detects discrepancies between scanned documents and system records',
      config: {
        nameMatch: true,
        idNumberMatch: true,
        dobMatch: true
      }
    },
    {
      id: 'outlier-payment',
      name: 'Outlier Payment Amount',
      category: 'Payments',
      icon: 'trending-up',
      enabled: true,
      threshold: 50,
      thresholdType: 'Variance %',
      severity: 'Medium',
      description: 'Flags payments significantly different from expected amounts',
      config: {
        variancePercent: 50,
        comparisonMode: 'expected_vs_actual',
        historicalAverage: true
      }
    },
    {
      id: 'missing-approval',
      name: 'Missing Approval Step',
      category: 'Compliance',
      icon: 'alert-triangle',
      enabled: true,
      threshold: 100,
      thresholdType: 'Required',
      severity: 'High',
      description: 'Detects when required approval steps are bypassed in workflows',
      config: {
        minApprovers: 2,
        amountThreshold: 5000000,
        requireCountersign: true
      }
    },
    {
      id: 'vendor-collusion',
      name: 'Vendor Collusion Patterns',
      category: 'Procurement',
      icon: 'users',
      enabled: false,
      threshold: 70,
      thresholdType: 'Pattern Score',
      severity: 'Medium',
      description: 'Identifies potential collusion between vendors through bidding patterns',
      config: {
        bidRotation: true,
        pricePatterns: true,
        sharedAddresses: true
      }
    },
    {
      id: 'ghost-vendor',
      name: 'Ghost Vendor Detection',
      category: 'Payments',
      icon: 'users',
      enabled: true,
      threshold: 100,
      thresholdType: 'Database Match',
      severity: 'High',
      description: 'Flags payments to recipients not in official vendor database',
      config: {
        requireRegistration: true,
        verifyTaxId: true,
        checkBlacklist: true
      }
    },
    {
      id: 'procedure-deviation',
      name: 'Procedure Deviation Detection',
      category: 'Compliance',
      icon: 'file-warning',
      enabled: true,
      threshold: 0,
      thresholdType: 'Tolerance',
      severity: 'High',
      description: 'Detects when actual procedures differ from expected standards',
      config: {
        temperatureChecks: true,
        safetyProtocols: true,
        documentationRequired: true
      }
    }
  ]);

  get categories(): string[] {
    return [...new Set(this.rules().map(r => r.category))];
  }

  get enabledCount(): number {
    return this.rules().filter(r => r.enabled).length;
  }

  getCategoryRules(category: string): DetectionRule[] {
    return this.rules().filter(r => r.category === category);
  }

  toggleRule(id: string): void {
    this.rules.update(rules => 
      rules.map(r => 
        r.id === id ? { ...r, enabled: !r.enabled } : r
      )
    );
  }

  updateThreshold(event: {id: string, value: number}): void {
    this.rules.update(rules => 
      rules.map(r => 
        r.id === event.id ? { ...r, threshold: event.value } : r
      )
    );
  }
}
