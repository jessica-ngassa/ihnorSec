import { Component, inject } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { TranslationService } from '../../shared/services/translation.service';

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
  private document = inject(DOCUMENT);
  private translationService = inject(TranslationService);
  
  currentLocale = this.translationService.currentLocale;

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
      label: 'Cases'
    },
    {
      path: '/document',
      icon: 'file-text',
      label: 'OCR Review'
    },
    {
      path: '/reports',
      icon: 'file-text',
      label: 'Reports & Audit'
    }
  ];

  configurationItems = [
    {
      path: '/config/modules',
      icon: 'settings',
      label: 'Modules'
    },
    {
      path: '/config/detection-rules',
      icon: 'sliders-horizontal',
      label: 'Detection Rules'
    },
    {
      path: '/config/data-mapping',
      icon: 'database',
      label: 'Data Mapping'
    },
    {
      path: '/config/agency-settings',
      icon: 'settings',
      label: 'Agency Settings'
    }
  ];

  platformAdminItems = [
    {
      path: '/admin/multi-tenant',
      icon: 'users',
      label: 'Multi-Tenant Config'
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

  toggleLanguage() {
    const newLocale = this.currentLocale() === 'en' ? 'fr' : 'en';
    this.translationService.setLocale(newLocale);
  }
}
