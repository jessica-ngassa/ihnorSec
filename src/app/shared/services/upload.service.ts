import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DocumentTypeConfig, ColumnMapping } from '../../shared/model/upload.model';
import { ValidationResult } from '../model/documentation-validation';

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

  // Simulate analyzing a file to return mappings
  analyzeFileColumns(file: File): Observable<ColumnMapping[]> {
    console.log(`Analyzing file: ${file.name}`);
    return of(this.MOCK_MAPPING).pipe(delay(800));
  }



  getDocumentTypes(): Observable<DocumentTypeConfig[]> {
    return of([
      { id: 'cni', label: 'National ID Card (CNI)', icon: '🪪' },
      { id: 'passport', label: 'Passport', icon: '📘' },  // TODO REMOVE THIS AND UPDATE
      { id: 'license', label: "Driver's License", icon: '🚗' },
      { id: 'birth', label: 'Birth Certificate', icon: '📄' },
      { id: 'statement', label: 'Bank Statement', icon: '🏦' },
      { id: 'contract', label: 'Employment Contract', icon: '📋' },
      { id: 'insurance', label: 'Insurance Card', icon: '💳' },
      { id: 'medical', label: 'Medical Certificate', icon: '⚕️' }
    ]).pipe(delay(300));
  }

  // AI Validation Simulation
  validateDocument(file: File, docTypeId: string): Observable<ValidationResult> {
    console.log(`Validating ${file.name} against type: ${docTypeId}`);

    // Simulate AI Processing Delay
    return of(this.mockAIValidation(docTypeId)).pipe(delay(2000));
  }

  private mockAIValidation(docTypeId: string): ValidationResult {
    const isMatch = docTypeId !== 'passport';

    if (isMatch) {
      return {
        status: 'match',
        confidence: 97.8,
        detectedType: docTypeId
      };
    } else {
      return {
        status: 'mismatch',
        confidence: 71.8,
        detectedType: 'National ID Card'
      };
    }
  }
}
