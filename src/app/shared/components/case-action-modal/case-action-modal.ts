import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-case-action-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './case-action-modal.html',
  styleUrl: './case-action-modal.scss'
})
export class CaseActionModal {
  @Input() isOpen = false;
  @Input() actionType: 'reassign' | 'escalate' | 'close' = 'reassign';
  @Input() riskScore = 0;
  @Input() amount = '';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();

  selectedOption = '';
  notes = '';

  reassignOptions = [
    { id: 'marie', name: 'Marie Diop', role: 'Senior Investigator', cases: 8, available: true },
    { id: 'paul', name: 'Paul Koffi', role: 'Investigator', cases: 12, available: true },
    { id: 'sarah', name: 'Sarah Mensah', role: 'Fraud Analyst', cases: 5, available: true },
    { id: 'david', name: 'David Okoro', role: 'Team Lead', cases: 15, available: false }
  ];

  escalateOptions = [
    { id: 'director', name: 'Director of Investigations', department: 'Fraud Prevention' },
    { id: 'cfo', name: 'Chief Financial Officer', department: 'Finance' },
    { id: 'legal', name: 'Legal Department', department: 'Legal Affairs' },
    { id: 'audit', name: 'Internal Audit', department: 'Audit & Compliance' }
  ];

  closeOptions = [
    { id: 'legitimate', name: 'Legitimate - No Fraud Detected', description: 'Investigation found no evidence of fraudulent activity', selected: true },
    { id: 'fraud', name: 'Fraud Confirmed', description: 'Investigation confirmed fraudulent activity - action taken' },
    { id: 'insufficient', name: 'Insufficient Evidence', description: 'Unable to confirm or deny - case closed pending new information' }
  ];

  onClose() {
    this.close.emit();
    this.reset();
  }

  onConfirm() {
    this.confirm.emit({
      type: this.actionType,
      selectedOption: this.selectedOption,
      notes: this.notes
    });
    this.reset();
  }

  private reset() {
    this.selectedOption = '';
    this.notes = '';
  }
}