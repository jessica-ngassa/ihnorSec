import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, Shield, Bell, User, UserCheck, AlertTriangle, AlertCircle, Upload, FilePlus, BellDot, Eye, Search, SlidersHorizontal, ZoomIn, RotateCw, FileText, FileCheck, FileImage, Activity, Users, BarChart3, ShieldAlert, DollarSign, ArrowLeft, Check, Download, CheckCircle, X, ZoomOut, TrendingUp, Calendar } from 'lucide-angular';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     provideNzI18n(en_US), 
     provideAnimationsAsync(), 
     provideHttpClient(),
     importProvidersFrom(
      LucideAngularModule.pick({
        Shield,
        Bell,
        User,
        UserCheck,
        AlertTriangle,
        AlertCircle,
        Upload,
        FilePlus,
        BellDot,
        Eye,
        Search,
        SlidersHorizontal,
        ZoomIn,
        RotateCw,
        FileText,
        FileCheck,
        FileImage,
        Activity,
        Users,
        BarChart3,
        ShieldAlert,
        DollarSign,
        ArrowLeft,
        Check,
        Download,
        CheckCircle,
        X,
        ZoomOut,
        TrendingUp,
        Calendar
      })
    )
  ]
};
