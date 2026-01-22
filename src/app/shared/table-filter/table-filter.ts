import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-table-filter',
imports: [CommonModule, FormsModule, NzSliderModule, NzSelectModule, NzButtonModule, NzInputNumberModule],  templateUrl: './table-filter.html',
  styleUrl: './table-filter.scss',
})
export class TableFilter {
  range = signal<[number, number]>([0, 100]);
  documentStatus = signal<string>('All');

  rangeMin = 0;
  rangeMax = 100;
  rangeValue: [number, number] = [0, 100];
  documentValue = 'All';
  documentOptions = ['All', 'Yes', 'No'];

  filterChanged = output<{range: [number, number], status: string}>();
  reset = output<void>();

  applyFilters() {
    this.range.set(this.rangeValue);
    this.documentStatus.set(this.documentValue);
    this.filterChanged.emit({ range: this.range(), status: this.documentStatus() });
  }

  resetFilters() {
    this.rangeMin = 0;
    this.rangeMax = 100;
    this.rangeValue = [0, 100];
    this.documentValue = 'All';
    this.range.set([0, 100]);
    this.documentStatus.set('All');
    this.reset.emit();
  }

}
