import { Component, input } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { LucideAngularModule } from 'lucide-angular';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, NzBadgeModule, NzAvatarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,

})
export class Header {

  currentPage = input<string | undefined>();
}
