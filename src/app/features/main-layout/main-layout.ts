import { Component, inject } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LucideAngularModule } from "lucide-angular";
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NzLayoutModule, NzMenuModule, NzIconModule, Header, LucideAngularModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  private router = inject(Router);

  menuItems = [
    {
      path: '/dashboard',
       icon: 'dashboard',
       label: 'Dashboard'
      },
    {
      path: '/upload',
      icon: 'upload',
      label: 'Uploads'
    },
    {
      path: '/fraud',
      icon: 'warning',
      label: 'Analytics Result'
    },
    {
      path: '/document',
      icon: 'file-text',
      label: 'Documents'
    }
  ];

  currentTitle = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.snapshot.root;
        while (route.firstChild) route = route.firstChild;
        return route.title || 'Dashboard Overview';
      }),
      startWith('Dashboard Overview')
    )
  );

}
