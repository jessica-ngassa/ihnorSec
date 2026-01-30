import { Component, signal, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AgencySettingsService } from '../../../shared/services/agency-settings.service';
import { AgencySettings as IAgencySettings, SettingsTab, TeamMember } from '../../../shared/model/agency-settings.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { InviteMemberModal, InviteMemberData } from '../../../shared/components/invite-member-modal/invite-member-modal';

@Component({
  selector: 'app-agency-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    NzButtonModule,
    NzTagModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    LoadingSpinner,
    InviteMemberModal
  ],
  templateUrl: './agency-settings.html',
  styleUrl: './agency-settings.scss',

})
export class AgencySettings implements OnInit {
  private settingsService = inject(AgencySettingsService);
  
  activeTab = signal<SettingsTab>('general');
  isLoading = signal(true);
  showInviteModal = signal(false);
  
  settings = toSignal(this.settingsService.getSettings());
  
  primaryColor = signal('#1F3A7D');
  accentColor = signal('#F2C94C');

  constructor() {
    // Set loading to false when settings arrive
    effect(() => {
      const currentSettings = this.settings();
      if (currentSettings) {
        this.primaryColor.set(currentSettings.branding.primaryColor);
        this.accentColor.set(currentSettings.branding.accentColor);
        this.isLoading.set(false);
      }
    });
  }

  tabs = [
    { id: 'general' as const, label: 'General Info', icon: 'building-2' },
    { id: 'branding' as const, label: 'Branding', icon: 'palette' },
    { id: 'users' as const, label: 'Team Members', icon: 'users' },
    { id: 'security' as const, label: 'Platform & Security', icon: 'shield' }
  ];

  sectorTypes = [
    'Public Sector',
    'Parastatal',
    'Private Sector',
    'NGO / Funder'
  ];

  currencies = [
    'FCFA (XAF)',
    'US Dollar (USD)',
    'Euro (EUR)'
  ];

  sessionTimeouts = [
    { value: 30, label: '30 Minutes' },
    { value: 60, label: '60 Minutes' },
    { value: 240, label: '4 Hours' }
  ];

  languages = [
    'French (Français)',
    'English (Cameroon)'
  ];

  timeZones = [
    'Africa/Douala (GMT+1)',
    'Africa/Yaounde (GMT+1)'
  ];

  ngOnInit(): void {
    // Loading state is now handled in constructor effect
  }

  onTabChange(tab: SettingsTab): void {
    this.activeTab.set(tab);
  }

  onSaveAll(): void {
    this.isLoading.set(true);
    this.settingsService.updateSettings({}).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  onColorChange(type: 'primary' | 'accent', color: string): void {
    if (type === 'primary') {
      this.primaryColor.set(color);
    } else {
      this.accentColor.set(color);
    }
  }

  onRemoveTeamMember(id: string): void {
    this.settingsService.removeTeamMember(id).subscribe();
  }

  getStatusClass(status: string): string {
    return status === 'Active' 
      ? 'bg-green-50 text-green-700 border-green-100'
      : 'bg-orange-50 text-orange-600 border-orange-100';
  }

  onInviteMember(): void {
    this.showInviteModal.set(true);
  }

  onMemberInvited(memberData: InviteMemberData): void {
    const newMember = {
      name: memberData.fullName,
      fullName: memberData.fullName,
      email: memberData.email,
      role: memberData.role
    };
    
    this.settingsService.addTeamMember(newMember).subscribe({
      next: () => {
        // Member added successfully
        this.showInviteModal.set(false);
      },
      error: (error) => {
        console.error('Failed to invite member:', error);
      }
    });
  }
}
