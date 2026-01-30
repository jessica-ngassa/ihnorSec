export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  profilePicture?: string;
  role: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  activeSessions: ActiveSession[];
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface UserPreferences {
  language: 'en' | 'fr';
  timezone: string;
  dateFormat: string;
  notifications: NotificationSettings;
  display: DisplaySettings;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  weeklyDigest: boolean;
  systemAlerts: boolean;
  caseAssignments: boolean;
}

export interface DisplaySettings {
  compactMode: boolean;
  showConfidenceScores: boolean;
  enableAnimations: boolean;
}

export type ProfileTab = 'personal' | 'security' | 'preferences';