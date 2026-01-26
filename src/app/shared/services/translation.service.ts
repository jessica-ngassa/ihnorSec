import { Injectable, signal } from '@angular/core';

type TranslationKey = 'upload.title' | 'upload.description' | 'upload.tab.data' | 'upload.tab.document';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLocale = signal<'en' | 'fr'>('en');

  private translations: Record<'en' | 'fr', Record<TranslationKey, string>> = {
    en: {
      'upload.title': 'Upload Center',
      'upload.description': 'Import data files or upload documents for OCR analysis and fraud detection',
      'upload.tab.data': 'Import Data (CSV/Excel)',
      'upload.tab.document': 'Import Documents (OCR)'
    },
    fr: {
      'upload.title': 'Centre de Téléchargement',
      'upload.description': 'Importez des fichiers de données ou téléchargez des documents pour l\'analyse OCR et la détection de fraude',
      'upload.tab.data': 'Importer des Données (CSV/Excel)',
      'upload.tab.document': 'Importer des Documents (OCR)'
    }
  };

  translate(key: TranslationKey): string {
    const locale = this.currentLocale();
    return this.translations[locale][key] || key;
  }

  setLocale(locale: 'en' | 'fr') {
    this.currentLocale.set(locale);
  }
}