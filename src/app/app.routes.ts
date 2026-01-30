import { Routes } from '@angular/router';
import { MainLayout } from './features/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/login/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'upload',
        loadComponent: () => import('./features/upload-center/upload-center').then(m => m.UploadCenterComponent)
      },
      {
        path: 'fraud',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/fraud-cases/fraud/fraud').then(m => m.Fraud)
          },
          {
            path: ':id',
            loadComponent: () => import('./features/fraud-cases/fraud-detail/fraud-detail').then(m => m.FraudDetail)
          }
        ]
      },
          {
        path: 'document',
        loadComponent: () => import('./features/document/document').then(m => m.Document)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports').then(m => m.Reports)
      },
      {
        path: 'config',
        children: [
          {
            path: 'modules',
            loadComponent: () => import('./features/config/modules/modules').then(m => m.Modules)
          },
          {
            path: 'detection-rules',
            loadComponent: () => import('./features/config/detection-rules/detection-rules').then(m => m.DetectionRules)
          },
          {
            path: 'data-mapping',
            loadComponent: () => import('./features/config/data-mapping/data-mapping').then(m => m.DataMapping)
          },
          {
            path: 'agency-settings',
            loadComponent: () => import('./features/config/agency-settings/agency-settings').then(m => m.AgencySettings)
          }
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: 'multi-tenant',
            loadComponent: () => import('./features/tenant/tenant').then(m => m.MultiTenant)
          }
        ]
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then(m => m.ProfileComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
