import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { ReportTemplate } from '../../model/reports.interface';

@Component({
  selector: 'app-schedule-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './schedule-modal.html',
  styleUrl: './schedule-modal.scss'
})
export class ScheduleModal {
  @Input() isOpen = false;
  @Input() reportTemplates: ReportTemplate[] = [];
  @Input() agencyId = '';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();

  selectedTemplate = '';
  frequency = '';
  recipients = '';

  frequencyOptions = [
    { id: 'daily', name: 'Daily at 08:00', description: 'Every day at 8:00 AM' },
    { id: 'weekly', name: 'Weekly (Mondays)', description: 'Every Monday at 8:00 AM' },
    { id: 'monthly', name: 'Monthly (1st Day)', description: '1st day of every month at 8:00 AM' },
    { id: 'quarterly', name: 'Quarterly', description: 'Every 3 months on the 1st day' }
  ];

  onClose() {
    this.close.emit();
    this.reset();
  }

  onConfirm() {
    this.confirm.emit({
      templateId: this.selectedTemplate,
      frequency: this.frequency,
      recipients: this.recipients.split(',').map(email => email.trim()).filter(email => email)
    });
    this.reset();
  }

  private reset() {
    this.selectedTemplate = '';
    this.frequency = '';
    this.recipients = '';
  }

  isFormValid(): boolean {
    return !!(this.selectedTemplate && this.frequency && this.recipients.trim());
  }

  getSelectedTemplateName(): string {
    const template = this.reportTemplates.find(t => t.id === this.selectedTemplate);
    return template?.name || '';
  }

  getSelectedFrequencyName(): string {
    const option = this.frequencyOptions.find(f => f.id === this.frequency);
    return option?.name.toLowerCase() || '';
  }

  getRecipientCount(): number {
    return this.recipients.split(',').filter(email => email.trim()).length;
  }
}