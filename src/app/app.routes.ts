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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
