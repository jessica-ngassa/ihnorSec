import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Shield, CreditCard, Truck, Package, FileText, BarChart3 } from 'lucide-angular';
import { ModuleCard, ModuleData } from '../../../shared/components/module-card/module-card';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ModuleCard],
  templateUrl:'./modules.html',
  styleUrl: './modules.scss',
})
export class Modules {
  modules = signal<ModuleData[]>([
    {
      id: 'identity-ocr',
      name: 'Identity & OCR',
      icon: Shield,
      color: 'bg-blue-500',
      category: 'Core',
      enabled: true,
      description: 'Document scanning, OCR extraction, identity verification',
      features: ['National ID scanning', 'Passport OCR', 'Template matching', 'Duplicate detection']
    },
    {
      id: 'payments',
      name: 'Payments & Disbursements',
      icon: CreditCard,
      color: 'bg-green-500',
      category: 'Core',
      enabled: true,
      description: 'Payment analysis, overpayment detection, ghost vendor identification',
      features: ['Variance analysis', 'Duplicate payments', 'Ghost vendors', 'Approval chain validation']
    },
    {
      id: 'inventory',
      name: 'Inventory & Logistics',
      icon: Truck,
      color: 'bg-orange-500',
      category: 'Specialized',
      enabled: false,
      description: 'Stock tracking, shrinkage detection, supply chain monitoring',
      features: ['Stock reconciliation', 'Shrinkage alerts', 'Movement tracking', 'Anomaly detection']
    },
    {
      id: 'procurement',
      name: 'Procurement & Vendors',
      icon: Package,
      color: 'bg-purple-500',
      category: 'Specialized',
      enabled: true,
      description: 'Vendor verification, procurement compliance, bidding analysis',
      features: ['Vendor database', 'Bid rigging detection', 'Contract compliance', 'Collusion patterns']
    },
    {
      id: 'compliance',
      name: 'Compliance & Workflow',
      icon: FileText,
      color: 'bg-red-500',
      category: 'Core',
      enabled: true,
      description: 'Process compliance monitoring, procedure deviation detection',
      features: ['Workflow validation', 'Procedure tracking', 'Deviation alerts', 'Impact analysis']
    },
    {
      id: 'reporting',
      name: 'Reporting & Analytics',
      icon: BarChart3,
      color: 'bg-indigo-500',
      category: 'Core',
      enabled: true,
      description: 'Dashboard analytics, PDF reports, data exports',
      features: ['Custom dashboards', 'PDF generation', 'CSV exports', 'Trend analysis']
    }
  ]);

  enabledCount = computed(() => this.modules().filter(m => m.enabled).length);
  totalCount = computed(() => this.modules().length);
  progressPercentage = computed(() => (this.enabledCount() / this.totalCount()) * 100);

  toggleModule(id: string) {
    this.modules.update(modules => 
      modules.map(m => 
        m.id === id ? { ...m, enabled: !m.enabled } : m
      )
    );
  }
}
