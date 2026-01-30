import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Shield, CreditCard, Truck, Package, FileText, BarChart3, CheckCircle, XCircle } from 'lucide-angular';

export interface ModuleData {
  id: string;
  name: string;
  icon: any;
  color: string;
  category: string;
  enabled: boolean;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './module-card.html',
  styleUrl: './module-card.scss',
})
export class ModuleCard {
  @Input({ required: true }) module!: ModuleData;
  @Output() toggle = new EventEmitter<string>();

  CheckCircle = CheckCircle;
  XCircle = XCircle;

  onToggle() {
    this.toggle.emit(this.module.id);
  }
}
