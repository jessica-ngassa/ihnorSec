import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableColumn } from '../../../shared/model/tableColumn';
import { DataTable } from '../../../shared/components/data-table/data-table';
import { LucideAngularModule } from "lucide-angular";
import { TableFilter } from '../../../shared/table-filter/table-filter';
import { Router } from '@angular/router';
import { FraudService } from '../../../shared/services/fraud.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fraud',
  imports: [DataTable, LucideAngularModule, TableFilter, FormsModule],
  templateUrl: './fraud.html',
  styleUrl: './fraud.scss',
  standalone: true,
})
export class Fraud {

  private fraudService = inject(FraudService);
  private router = inject(Router);

  isFilterVisible = signal(false);
  searchValue = signal('');
  activeFilters = signal({ range: [0, 100], status: 'All' });

  rawFraudData = toSignal(this.fraudService.getFraudCases(), { initialValue: [] });

  filteredData = computed(() => {
    const data = this.rawFraudData();
    const search = this.searchValue().toLowerCase();
    const { range, status } = this.activeFilters();

    return data.filter(item => {
      const matchesSearch = search === '' ||
        item.name.toLowerCase().includes(search) ||
        (item.ocrData?.idNumber && item.ocrData.idNumber.toLowerCase().includes(search)) ||
        (item.systemData?.idNumber && item.systemData.idNumber.toLowerCase().includes(search)) ||
        (item.paymentData?.reference && item.paymentData.reference.toLowerCase().includes(search));

      const withinScore = item.fraudScore >= range[0] && item.fraudScore <= range[1];

      let matchesStatus = true;
      if (status === 'Yes') matchesStatus = item.documentMatched === true;
      if (status === 'No') matchesStatus = item.documentMatched === false;

      return matchesSearch && withinScore && matchesStatus;
    });
  });

  fraudColumns: TableColumn[] = [
    { key: 'recordType', label: 'Type', type: 'profile-icon' },
    { key: 'name', subKey: 'subText', label: 'Name/Transaction', type: 'double-text' },
    { key: 'idNumber', subKey: 'referenceId', label: 'ID/Reference', type: 'double-text' },
    { key: 'details', label: 'Details', type: 'details' },
    { key: 'fraudScore', label: 'Fraud Score', type: 'score', align: 'center' },
    { key: 'anomalies', label: 'Anomalies', type: 'anomalies', align: 'center' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'actions', label: 'Actions', type: 'action', align: 'right' }
  ];

    handleAction(event: any) {
    this.router.navigate(['/fraud', event.row.id]);
  }

  onFilterUpdate(event: any) {
    this.activeFilters.set(event);
  }
}
