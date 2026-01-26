import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Anomaly } from '../../model/anomaly.interface';

@Component({
  selector: 'app-anomalies-detected',
  imports: [LucideAngularModule, CommonModule, NzTagModule],
  templateUrl: './anomalies-detected.html',
  styleUrl: './anomalies-detected.scss',
})
export class AnomaliesDetected {
  @Input() anomalies: Anomaly[] = [];

  getSeverityColor(severity: Anomaly['severity']): string {
    switch (severity) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'gold';
      default:
        return 'default';
    }
  }

  getIcon(severity: Anomaly['severity']): string {
    return 'alert-circle';
  }

}
