import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { LucideAngularModule } from 'lucide-angular';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LucideAngularModule, NzBadgeModule, NzAvatarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,

})
export class Header {
  currentPage = input<string | undefined>();

  constructor(private router: Router, private userService: UserService) {}

  get profile() {
    return this.userService.profile;
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToNotifications(): void {
    this.router.navigate(['/notifications']);
  }
}
