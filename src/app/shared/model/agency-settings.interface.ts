export interface AgencySettings {
  general: {
    agencyName: string;
    agencyCode: string;
    sectorType: string;
    defaultCurrency: string;
  };
  branding: {
    logoUrl?: string;
    primaryColor: string;
    accentColor: string;
  };
  users: TeamMember[];
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    platformLanguage: string;
    timeZone: string;
  };
  environment: {
    region: string;
    mode: string;
    tenantId: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

export type SettingsTab = 'general' | 'branding' | 'users' | 'security';