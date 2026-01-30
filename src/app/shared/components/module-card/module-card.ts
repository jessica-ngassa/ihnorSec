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
  template: `
    <div
      [class]="'bg-white rounded-lg shadow-lg overflow-hidden transition-all ' + 
               (module.enabled ? 'border-2 border-green-500' : 'opacity-60')"
    >
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-4">
            <div [class]="module.color + ' p-3 rounded-lg'">
              <lucide-icon [img]="module.icon" class="w-6 h-6 text-white"></lucide-icon>
            </div>
            <div>
              <h3 class="text-[#1F3A7D] mb-1 font-semibold">{{ module.name }}</h3>
              <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {{ module.category }}
              </span>
            </div>
          </div>
          <button
            (click)="onToggle()"
            [class]="'p-2 rounded-lg transition-colors ' + 
                     (module.enabled 
                       ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                       : 'bg-gray-100 text-gray-400 hover:bg-gray-200')"
          >
            <lucide-icon 
              [img]="module.enabled ? CheckCircle : XCircle" 
              class="w-6 h-6">
            </lucide-icon>
          </button>
        </div>

        <p class="text-gray-600 text-sm mb-4">{{ module.description }}</p>

        <div class="border-t pt-4">
          <p class="text-sm font-medium text-gray-700 mb-2">Features:</p>
          <ul class="space-y-1">
            <li 
              *ngFor="let feature of module.features" 
              class="text-sm text-gray-600 flex items-center gap-2"
            >
              <div class="w-1.5 h-1.5 bg-[#1F3A7D] rounded-full"></div>
              {{ feature }}
            </li>
          </ul>
        </div>

        <div 
          *ngIf="module.enabled" 
          class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200"
        >
          <p class="text-xs text-green-700 font-medium">
            ✓ Active for current tenant
          </p>
        </div>
      </div>
    </div>
  `
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