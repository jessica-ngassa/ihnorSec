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
  template: `
    <nz-modal
      [(nzVisible)]="visible"
      [nzFooter]="null"
      [nzClosable]="false"
      [nzMaskClosable]="false"
      nzWidth="500px"
      (nzOnCancel)="onCancel()">
      
      <ng-container *nzModalContent>
        <!-- Header -->
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-50 rounded-lg">
              <lucide-icon name="user-plus" class="w-5 h-5 text-[#1F3A7D]"></lucide-icon>
            </div>
            <div>
              <h3 class="text-lg font-black text-[#1F3A7D]">Invite Member</h3>
              <p class="text-xs text-gray-500 font-medium">Add a new investigator to your team</p>
            </div>
          </div>
          <button 
            (click)="onCancel()"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <lucide-icon name="x" class="w-5 h-5 text-gray-400"></lucide-icon>
          </button>
        </div>

        <!-- Form -->
        <form (ngSubmit)="onSubmit()" class="p-8 space-y-6">
          <div class="space-y-4">
            <!-- Full Name -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                [(ngModel)]="formData.fullName"
                name="fullName"
                placeholder="e.g. Samuel Eto'o"
                class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                required>
            </div>

            <!-- Email Address -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <div class="relative">
                <lucide-icon name="mail" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"></lucide-icon>
                <input
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  placeholder="name@agency.gov.cm"
                  class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                  required>
              </div>
            </div>

            <!-- Assigned Role -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assigned Role</label>
              <div class="relative">
                <lucide-icon name="shield-check" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"></lucide-icon>
                <select
                  [(ngModel)]="formData.role"
                  name="role"
                  class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/10 transition-all appearance-none">
                  <option value="">Select role</option>
                  @for (role of availableRoles; track role) {
                    <option [value]="role">{{ role }}</option>
                  }
                </select>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4 flex gap-3">
            <button
              type="button"
              (click)="onCancel()"
              class="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold h-12 rounded-xl transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!isFormValid() || isLoading()"
              class="flex-1 bg-[#1F3A7D] hover:bg-[#162A5A] text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              @if (isLoading()) {
                <lucide-icon name="loader-2" class="w-4 h-4 animate-spin mr-2 inline"></lucide-icon>
              }
              Send Invitation
            </button>
          </div>
        </form>
      </ng-container>
    </nz-modal>
  `
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