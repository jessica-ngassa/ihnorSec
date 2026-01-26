import { Component, output, signal, input, effect } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-document-type-selector',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './document-type-selector.html',
  styleUrl: './document-type-selector.scss',
})
export class DocumentTypeSelector {
   initialSelection = input<string>('');
  readonly = input<boolean>(false);
  typeSelected = output<string>();

  selected = signal<string>('');

  constructor() {
    effect(() => {
      if (this.initialSelection()) {
        this.selected.set(this.initialSelection());
      }
    });
  }

  docTypes = [
    { id: 'cni', label: 'National ID Card (CNI)', icon: '🪪' },
    { id: 'passport', label: 'Passport', icon: '📘' }, // TODO REMOVE THIS AND UPDATE
    { id: 'license', label: "Driver's License", icon: '🚗' },
    { id: 'birth', label: 'Birth Certificate', icon: '📄' },
    { id: 'statement', label: 'Bank Statement', icon: '🏦' },
    { id: 'contract', label: 'Employment Contract', icon: '📋' },
    { id: 'insurance', label: 'Insurance Card', icon: '💳' },
    { id: 'medical', label: 'Medical Certificate', icon: '⚕️' }
  ];

  select(id: string) {
    this.selected.set(id);
    this.typeSelected.emit(id);
  }

}
