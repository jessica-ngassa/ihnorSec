import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { DetectionRule } from '../../model/detection-rule.interface';

@Component({
  selector: 'app-rule-card',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, NzSliderModule],
  templateUrl: './rule-card.html',
  styleUrls: ['./rule-card.scss'],
})
export class RuleCardComponent {
  @Input() rule!: DetectionRule;
  @Output() toggleRule = new EventEmitter<string>();
  @Output() thresholdChange = new EventEmitter<{id: string, value: number}>();

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-orange-100 text-orange-700';
      case 'Low':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  onToggleRule(): void {
    this.toggleRule.emit(this.rule.id);
  }

  onThresholdChange(value: number): void {
    this.thresholdChange.emit({ id: this.rule.id, value });
  }
}
