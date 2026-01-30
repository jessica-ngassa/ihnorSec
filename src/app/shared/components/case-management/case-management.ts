import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-case-management',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './case-management.html',
  styleUrl: './case-management.scss'
})
export class CaseManagement {
  @Input() caseData: any;
  @Output() reassign = new EventEmitter<void>();
  @Output() escalate = new EventEmitter<void>();
  @Output() closeCase = new EventEmitter<void>();

  getStatusColor(status: string): string {
    switch (status) {
      case 'Unassigned': return 'bg-yellow-100 text-yellow-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  onReassign() {
    this.reassign.emit();
  }

  onEscalate() {
    this.escalate.emit();
  }

  onCloseCase() {
    this.closeCase.emit();
  }
}