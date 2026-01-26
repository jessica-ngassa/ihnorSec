import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DocumentTypeConfig, ColumnMapping } from '../../shared/model/upload.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  //Supported Document Types from Backend
  private DOC_TYPES: DocumentTypeConfig[] = [
    { id: 'cni', label: 'National ID Card (CNI)', icon: 'credit-card', color: 'blue' },
    { id: 'payslip', label: 'Payslip Document', icon: 'banknote', color: 'green' },
    { id: 'contract', label: 'Employment Contract', icon: 'file-text', color: 'purple' },
    { id: 'statement', label: 'Bank Statement', icon: 'landmark', color: 'orange' },
  ];

  // AI Mapping Result after CSV upload
  private MOCK_MAPPING: ColumnMapping[] = [
    { sourceColumn: 'NOM_COMPLET', targetField: 'full_name', confidence: 'auto' },
    { sourceColumn: 'NIF', targetField: 'id_number', confidence: 'auto' },
    { sourceColumn: 'DATE_NAISSANCE', targetField: 'date_of_birth', confidence: 'auto' },
    { sourceColumn: 'MONTANT', targetField: 'payment_amount', confidence: 'manual' }
  ];

  getDocumentTypes(): Observable<DocumentTypeConfig[]> {
    return of(this.DOC_TYPES).pipe(delay(300));
  }

  // Simulate analyzing a file to return mappings
  analyzeFileColumns(file: File): Observable<ColumnMapping[]> {
    console.log(`Analyzing file: ${file.name}`);
    return of(this.MOCK_MAPPING).pipe(delay(800));
  }
}
