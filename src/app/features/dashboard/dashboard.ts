import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { FraudTypesChart } from '../../shared/fraud-types-chart/fraud-types-chart';
import { FraudScoreChart } from '../../shared/fraud-score-chart/fraud-score-chart';
import { SectorsApplication } from "../../shared/sectors-application/sectors-application";
import { OrganizationalHealth } from "../../shared/organizational-health/organizational-health";
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NzLayoutModule, NzMenuModule,
    NzIconModule, NzAvatarModule, NzBadgeModule, NzCardModule, NzGridModule, NzButtonModule,
    LucideAngularModule, FraudScoreChart, FraudTypesChart, SectorsApplication, OrganizationalHealth],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  highRiskCount = 89;
  totalAnalyzed = 247;


  private dashboardService = inject(DashboardService);

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

}
