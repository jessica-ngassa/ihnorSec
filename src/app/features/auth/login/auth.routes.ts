import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '', 
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login').then(m => m.Login),
        title: 'Login - IHNOR Secure'
      },
      // { 
      //   path: 'forgot-password', 
      //   loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) 
      // },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];