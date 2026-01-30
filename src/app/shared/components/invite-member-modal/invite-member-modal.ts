import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

export interface InviteMemberData {
  fullName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-invite-member-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule
  ],
  templateUrl: './invite-member-modal.html',
  styleUrl: './invite-member-modal.scss',
})
export class InviteMemberModal {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() memberInvited = new EventEmitter<InviteMemberData>();

  isLoading = signal(false);

  formData: InviteMemberData = {
    fullName: '',
    email: '',
    role: ''
  };

  availableRoles = [
    'Field Investigator',
    'Senior Analyst',
    'Compliance Officer',
    'Agency Admin'
  ];

  getRoleIcon(role: string): string {
    const iconMap: Record<string, string> = {
      'Field Investigator': 'search',
      'Senior Analyst': 'bar-chart-3',
      'Compliance Officer': 'shield-check',
      'Agency Admin': 'settings'
    };
    return iconMap[role] || 'user';
  }

  isFormValid(): boolean {
    return !!(this.formData.fullName.trim() &&
              this.formData.email.trim() &&
              this.formData.role);
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.isLoading.set(true);

    // Simulate API call
    setTimeout(() => {
      this.memberInvited.emit({ ...this.formData });
      this.resetForm();
      this.isLoading.set(false);
      this.onCancel();
    }, 1000);
  }

  onCancel(): void {
    this.resetForm();
    this.visible = false;
    this.visibleChange.emit(false);
  }

  private resetForm(): void {
    this.formData = {
      fullName: '',
      email: '',
      role: ''
    };
  }
}
