import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AgencySettings, TeamMember } from '../model/agency-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class AgencySettingsService {
  private mockSettings: AgencySettings = {
    general: {
      agencyName: 'Ministry of Finance',
      agencyCode: 'MIN-FIN-CM',
      sectorType: 'Public Sector',
      defaultCurrency: 'FCFA (XAF)'
    },
    branding: {
      primaryColor: '#1F3A7D',
      accentColor: '#F2C94C'
    },
    users: [
      {
        id: '1',
        name: 'Marie Diop',
        email: 'marie.diop@gov.cm',
        role: 'Senior Investigator',
        status: 'Active'
      },
      {
        id: '2',
        name: 'Paul Koffi',
        email: 'paul.admin@gov.cm',
        role: 'Platform Admin',
        status: 'Active'
      },
      {
        id: '3',
        name: 'Jean Baptist',
        email: 'jean.b@gov.cm',
        role: 'Field Agent',
        status: 'Pending'
      }
    ],
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      platformLanguage: 'French (Français)',
      timeZone: 'Africa/Douala (GMT+1)'
    },
    environment: {
      region: 'National',
      mode: 'Production',
      tenantId: 'MIN-FIN-001'
    }
  };

  getSettings(): Observable<AgencySettings> {
    return of(this.mockSettings).pipe(delay(300));
  }

  updateSettings(settings: Partial<AgencySettings>): Observable<boolean> {
    if (settings.branding) {
      this.mockSettings.branding = { ...this.mockSettings.branding, ...settings.branding };
    }
    // Simulate API call
    this.mockSettings = { ...this.mockSettings, ...settings };
    return of(true).pipe(delay(1000));
  }

  addTeamMember(member: { name: string; email: string; role: string }): Observable<TeamMember> {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
      status: 'Pending'
    };
    this.mockSettings.users.push(newMember);
    return of(newMember).pipe(delay(500));
  }

  removeTeamMember(id: string): Observable<boolean> {
    this.mockSettings.users = this.mockSettings.users.filter(u => u.id !== id);
    return of(true).pipe(delay(500));
  }
}
