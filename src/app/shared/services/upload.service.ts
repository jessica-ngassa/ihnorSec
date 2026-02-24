import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, interval, throwError } from 'rxjs';
import { delay, switchMap, takeUntil, take, catchError } from 'rxjs/operators';
import { DocumentTypeConfig, ColumnMapping } from '../../shared/model/upload.model';
import { ValidationResult } from '../model/documentation-validation';

export interface OCRResult {
  bbox: number[][];
  text: string;
  confidence: number;
}

export interface OCRResponse {
  results: OCRResult[];
  num_detections: number;
  language: string;
  backend: string;
}

export interface PresignedUrlResponse {
  job_id: string;
  upload_url: string;
  s3_key: string;
  expires_in: number;
  status: string;
  message: string;
}

export interface JobStatusResponse {
  job_id: string;
  status: 'UPLOADING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  language: string;
  created_at: number;
  updated_at: number;
  result?: OCRResponse;
  error_message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private http = inject(HttpClient);

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

  uploadImage(file: File): Observable<{url: string}> {
    // TODO: Replace with actual file upload service (AWS S3, Cloudinary, etc.)
    // For now, return a mock URL or use the demo image
    return of({ url: 'https://raw.githubusercontent.com/PaddlePaddle/PaddleOCR/release/2.6/doc/imgs_en/img_12.jpg' }).pipe(delay(500));
  }

  /**
   * Get presigned URL for document upload
   * @param language Language for OCR processing (e.g., 'en')
   * @param fileType MIME type of the file (e.g., 'image/jpeg', 'application/pdf')
   */
  getPresignedUrl(language: string, fileType: string): Observable<PresignedUrlResponse> {
    const url = 'https://api.hintekkllc.com/v1/ihnor-secure/ocr/presigned-url';
    const payload = { language, file_type: fileType };

    return this.http.post<PresignedUrlResponse>(url, payload);
  }

  /**
   * Upload file to S3 using presigned URL
   * @param uploadUrl The presigned URL from getPresignedUrl
   * @param file The file to upload
   * @param fileType The MIME type of the file
   */
  uploadFileToPresignedUrl(uploadUrl: string, file: File, fileType: string): Observable<any> {
    return new Observable(observer => {
      fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        mode: 'cors',
        credentials: 'omit'
      })
        .then(response => {
          if (response.ok || response.status === 200) {
            observer.next(response);
            observer.complete();
          } else {
            observer.error(new Error(`Upload failed with status ${response.status}`));
          }
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   * Poll job status until completion
   * @param jobId The job ID from presigned URL response
   * @param pollIntervalMs Polling interval in milliseconds (default 2000ms)
   * @param maxAttempts Maximum number of polling attempts (default 150 = 5 minutes at 2s intervals)
   */
  pollJobStatus(jobId: string, pollIntervalMs: number = 2000, maxAttempts: number = 150): Observable<JobStatusResponse> {
    const url = `https://api.hintekkllc.com/v1/ihnor-secure/ocr/jobs/${jobId}`;

    return interval(pollIntervalMs).pipe(
      take(maxAttempts),
      switchMap(() => this.http.get<JobStatusResponse>(url)),
      takeUntil(
        interval(pollIntervalMs).pipe(
          switchMap(() => this.http.get<JobStatusResponse>(url)),
          takeUntil(
            interval(pollIntervalMs).pipe(
              switchMap(() => this.http.get<JobStatusResponse>(url)),
              switchMap(response => {
                if (response.status === 'COMPLETED' || response.status === 'FAILED') {
                  return of(response);
                }
                return throwError(() => new Error('Still processing'));
              })
            )
          )
        )
      )
    );
  }

  /**
   * Complete workflow: get presigned URL, upload file, and poll status
   * @param file The file to upload and process
   * @param language Language for OCR processing
   */
  runDocumentAnalysis(file: File, language: string = 'en'): Observable<JobStatusResponse> {
    const fileType = file.type || this.getMimeType(file.name);

    return this.getPresignedUrl(language, fileType).pipe(
      switchMap(presignedResponse => {
        return this.uploadFileToPresignedUrl(presignedResponse.upload_url, file, fileType).pipe(
          switchMap(() => {
            // After upload, start polling job status
            return this.pollJobStatusUntilCompletion(presignedResponse.job_id);
          })
        );
      })
    );
  }

  /**
   * Poll job status until it reaches a terminal state (COMPLETED or FAILED)
   * @param jobId The job ID to poll
   * @param pollIntervalMs Polling interval in milliseconds
   */
  private pollJobStatusUntilCompletion(jobId: string, pollIntervalMs: number = 2000): Observable<JobStatusResponse> {
    const url = `https://api.hintekkllc.com/v1/ihnor-secure/ocr/jobs/${jobId}`;

    return interval(pollIntervalMs).pipe(
      switchMap(() => this.http.get<JobStatusResponse>(url)),
      switchMap(response => {
        if (response.status === 'COMPLETED' || response.status === 'FAILED') {
          return of(response);
        }
        return throwError(() => ({ continue: true }));
      }),
      // Continue polling until we get a terminal state
      catchError((error: any) => {
        if (error.continue) {
          return this.pollJobStatusUntilCompletion(jobId, pollIntervalMs);
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Get MIME type from file extension if not provided
   */
  private getMimeType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'pdf': 'application/pdf',
      'gif': 'image/gif',
      'webp': 'image/webp'
    };
    return mimeTypes[extension || ''] || 'application/octet-stream';
  }

  processOCR(imageUrl: string, language: string = 'en'): Observable<OCRResponse> {
    return this.http.post<OCRResponse>(
      'https://adjonkep--ihnor-secure-ocr-ocrmodelgpu-ocr.modal.run',
      { image_url: imageUrl, language }
    );
  }
}
