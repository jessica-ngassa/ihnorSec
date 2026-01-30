import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../model/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfile = signal<UserProfile>({
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@finance.gov',
    phone: '+237 670 000 000',
    jobTitle: 'System Administrator',
    department: 'IT & Digital Services',
    role: 'Platform Admin'
  });

  get profile() {
    return this.userProfile.asReadonly();
  }

  updateProfile(updates: Partial<UserProfile>): void {
    this.userProfile.update(profile => ({ ...profile, ...updates }));
  }
}