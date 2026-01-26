import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-data-type-selector',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './data-type-selector.html',
  styleUrl: './data-type-selector.scss',
})
export class DataTypeSelector {
  initialSelection = input<string>('');
  readonly = input<boolean>(false); // Controlled by parent
  typeSelected = output<string>();

  selected = signal<string>('');

  constructor() {
    effect(() => {
      // Initialize selection if provided
      if (this.initialSelection()) {
        this.selected.set(this.initialSelection());
      }
    });
  }

  types = [
    { id: 'payment', title: 'Payment Records', desc: 'Detect overpayments, ghost workers, and duplicate payments', icon: '💰' },
    { id: 'financial', title: 'Financial Data', desc: 'Budget vs actual analysis and financial anomaly detection', icon: '📊' },
    { id: 'identity', title: 'Identity Records', desc: 'Duplicate identity detection and verification', icon: '🪪' },
    { id: 'compliance', title: 'Compliance/Process', desc: 'Procedure deviation and compliance analysis', icon: '🔬' }
  ];

  select(id: string) {
    if (this.readonly()) return;
    this.selected.set(id);
    this.typeSelected.emit(id);
  }
}
