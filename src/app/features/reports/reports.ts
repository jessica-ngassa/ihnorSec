import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ReportsService } from '../../shared/services/reports.service';
import { ReportTemplate, AuditLog, ReportPreview } from '../../shared/model/reports.interface';
import { ScheduleModal } from '../../shared/components/schedule-modal/schedule-modal';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzTagModule,
    NzCardModule,
    NzAlertModule,
    NzPaginationModule,
    ScheduleModal
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {
  activeTab = signal<'reports' | 'audit'>('reports');
  searchTerm = signal<string>('');
  agencyId = signal<string>('ministry-finance');
  
  reportTemplates = signal<ReportTemplate[]>([]);
  auditLogs = signal<AuditLog[]>([]);
  reportPreview = signal<ReportPreview | null>(null);
  selectedTemplate = signal<ReportTemplate | null>(null);
  
  isGenerating = signal<boolean>(false);
  showPreview = signal<boolean>(false);
  showScheduleModal = signal<boolean>(false);

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.loadReportTemplates();
    this.loadAuditLogs();
    this.loadReportPreview();
  }

  private loadReportTemplates(): void {
    const templates = this.reportsService.getReportTemplates(this.agencyId());
    this.reportTemplates.set(templates);
    if (templates.length > 0 && !this.selectedTemplate()) {
      this.selectedTemplate.set(templates[0]);
    }
  }

  private loadAuditLogs(): void {
    const logs = this.reportsService.getAuditLogs();
    this.auditLogs.set(logs);
  }

  private loadReportPreview(): void {
    const preview = this.reportsService.getReportPreview();
    this.reportPreview.set(preview);
  }

  onTabChange(tab: 'reports' | 'audit'): void {
    this.activeTab.set(tab);
  }

  onTemplateSelect(template: ReportTemplate): void {
    this.selectedTemplate.set(template);
    this.showPreview.set(false);
  }

  onGenerateReport(template: ReportTemplate): void {
    this.selectedTemplate.set(template);
    this.isGenerating.set(true);
    this.showPreview.set(false);
    
    setTimeout(() => {
      this.isGenerating.set(false);
      this.showPreview.set(true);
    }, 2000);
  }

  onDownloadReport(): void {
    const preview = this.reportPreview();
    if (preview) {
      this.reportsService.downloadReport('monthly-summary');
    }
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  getFilteredAuditLogs(): AuditLog[] {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.auditLogs();
    
    return this.auditLogs().filter(log => 
      log.user.toLowerCase().includes(term) ||
      log.action.toLowerCase().includes(term) ||
      log.object.toLowerCase().includes(term)
    );
  }

  getRiskLevelClass(riskLevel: string): string {
    switch (riskLevel) {
      case 'Critical': return 'bg-red-50 text-red-600 border-red-100';
      case 'High': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Medium': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  }

  openScheduleModal(): void {
    this.showScheduleModal.set(true);
  }

  closeScheduleModal(): void {
    this.showScheduleModal.set(false);
  }

  onScheduleConfirm(scheduleData: any): void {
    console.log('Schedule created:', scheduleData);
    this.showScheduleModal.set(false);
    // Here you would typically call a service to save the schedule
  }
}
