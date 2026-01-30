import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LucideAngularModule } from "lucide-angular";
import { CommonModule } from '@angular/common';
import { FraudTypesChart } from '../../shared/components/fraud-types-chart/fraud-types-chart';
import { FraudScoreChart } from '../../shared/components/fraud-score-chart/fraud-score-chart';
import { SectorsApplication } from "../../shared/components/sectors-application/sectors-application";
import { OrganizationalHealth } from "../../shared/components/organizational-health/organizational-health";
import { RecentHighRiskDetections } from '../../shared/components/recent-high-risk-detections/recent-high-risk-detections';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NzLayoutModule, NzMenuModule,
    NzIconModule, NzAvatarModule, NzBadgeModule, NzCardModule, NzGridModule, NzButtonModule,
    LucideAngularModule, FraudScoreChart, FraudTypesChart, SectorsApplication, OrganizationalHealth,
    RecentHighRiskDetections, LoadingSpinner],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  highRiskCount = 89;
  totalAnalyzed = 247;

  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  stats = toSignal(this.dashboardService.getDashboardStats(), { initialValue: [] });

  riskData = toSignal(this.dashboardService.getRiskAssessment(), {
    initialValue: { highRiskCases: 0, totalAnalyzed: 0, riskScore: 0 }
  });

  analysisData = toSignal(this.dashboardService.getAnalysisBreakdown(), {
    initialValue: { document: 0, payment: 0, compliance: 0 }
  });

  matchingData = toSignal(this.dashboardService.getTemplateMatchingStats(), {
    initialValue: { perfect: 0, high: 0, mismatch: 0 }
  });

  highRiskCases = toSignal(this.dashboardService.getHighRiskCases(), {
    initialValue: []
  });

  isLoading = computed(() => {
    return this.stats().length === 0 || this.highRiskCases().length === 0;
  });

  onNavigateToCase(caseId: string): void {
    this.router.navigate(['/fraud', caseId]);
  }

  onViewAllCases(): void {
    this.router.navigate(['/fraud']);
  }
}
