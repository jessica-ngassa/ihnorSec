import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { UserService } from '../../shared/services/user.service';
import { SecuritySettings, UserPreferences, ProfileTab } from '../../shared/model/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, NzSpinModule, NzSwitchModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent {
  loading = signal(false);
  activeTab = signal<ProfileTab>('personal');

  constructor(private userService: UserService) {}

  get profile() {
    return this.userService.profile;
  }

  security = signal<SecuritySettings>({
    twoFactorEnabled: true,
    activeSessions: [
      {
        id: '1',
        device: 'Windows',
        browser: 'Chrome',
        location: 'Yaoundé, Cameroon',
        lastActive: 'Just now',
        isCurrent: true
      },
      {
        id: '2',
        device: 'iPhone',
        browser: 'Safari',
        location: 'Douala, Cameroon',
        lastActive: '2 hours ago',
        isCurrent: false
      }
    ]
  });

  preferences = signal<UserPreferences>({
    language: 'fr',
    timezone: 'Africa/Douala',
    dateFormat: 'DD/MM/YYYY',
    notifications: {
      emailNotifications: true,
      weeklyDigest: true,
      systemAlerts: true,
      caseAssignments: true
    },
    display: {
      compactMode: false,
      showConfidenceScores: true,
      enableAnimations: true
    }
  });

  setActiveTab(tab: ProfileTab): void {
    this.activeTab.set(tab);
  }

  updateProfile(field: string, value: string): void {
    this.userService.updateProfile({ [field]: value });
  }

  toggleTwoFactor(): void {
    this.security.update(sec => ({ ...sec, twoFactorEnabled: !sec.twoFactorEnabled }));
  }

  revokeSession(sessionId: string): void {
    this.security.update(sec => ({
      ...sec,
      activeSessions: sec.activeSessions.filter(s => s.id !== sessionId)
    }));
  }

  updatePreferences(section: keyof UserPreferences, field: string, value: any): void {
    this.preferences.update(prefs => {
      if (section === 'notifications') {
        return {
          ...prefs,
          notifications: { ...prefs.notifications, [field]: value }
        };
      } else if (section === 'display') {
        return {
          ...prefs,
          display: { ...prefs.display, [field]: value }
        };
      } else {
        return { ...prefs, [field]: value };
      }
    });
  }

  saveProfile(): void {
    this.loading.set(true);
    // Simulate API call
    setTimeout(() => this.loading.set(false), 1000);
  }

  openPhotoUpload(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.userService.updateProfile({ 
          profilePicture: e.target?.result as string 
        });
      };
      reader.readAsDataURL(file);
    }
  }
}