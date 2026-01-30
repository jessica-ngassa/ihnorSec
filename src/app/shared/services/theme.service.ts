import { Injectable, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export interface ThemeColors {
  primary: string;
  accent: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);

  private _colors = signal<ThemeColors>({
    primary: '#1F3A7D',
    accent: '#F2C94C'
  });

  colors = this._colors.asReadonly();

  constructor() {
    effect(() => {
      const colors = this._colors();
      this.applyTheme(colors);
    });
  }

  updateColors(colors: Partial<ThemeColors>): void {
    this._colors.update(current => ({ ...current, ...colors }));
  }

  private applyTheme(colors: ThemeColors): void {
    const root = this.document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-accent', colors.accent);

    // Generate lighter/darker variants
    root.style.setProperty('--color-primary-hover', this.darkenColor(colors.primary, 10));
    root.style.setProperty('--color-primary-light', this.lightenColor(colors.primary, 90));
  }

  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
}
