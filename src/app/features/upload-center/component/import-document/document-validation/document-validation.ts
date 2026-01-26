import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ValidationResult } from '../../../../../shared/model/documentation-validation';

@Component({
  selector: 'app-document-validation',
  imports: [CommonModule, LucideAngularModule],
  standalone: true,
  templateUrl: './document-validation.html',
  styleUrl: './document-validation.scss',
})
export class DocumentValidation {

result = input<ValidationResult | null>(null);
}
