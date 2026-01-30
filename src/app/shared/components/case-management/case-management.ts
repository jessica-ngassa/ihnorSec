import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-management',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './case-management.html',
  styleUrl: './case-management.scss'
})
export class CaseManagement {
  @Input() caseName: string = '';
  @Input() caseStatus: string = '';
  @Input() recordType: string = '';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/fraud']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'High Risk': return 'border-red-200 bg-red-50 text-red-700'; //TODO MAKE THIS BETTER
      case 'Medium Risk': return 'border-orange-200 bg-orange-50 text-orange-700';
      case 'Low Risk': return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'Clean': return 'border-green-200 bg-green-50 text-green-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  }
}
