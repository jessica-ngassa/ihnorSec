import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorData } from '../../model/dashboard.interface';

@Component({
  selector: 'app-sectors-application',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sectors-application.html',
  styleUrl: './sectors-application.scss',
})
export class SectorsApplication {
  sectors: SectorData[] = [
    { id: '1', name: 'Sécurité Sociale', count: 2347, icon: '🏥', color: 'blue' }, // TODO TO REMOVE
    { id: '2', name: 'Fonction Publique', count: 3891, icon: '🏛️', color: 'purple' },
    { id: '3', name: 'Finances Publiques', count: 1892, icon: '💰', color: 'green' },
    { id: '4', name: 'Assurances Santé', count: 1456, icon: '⚕️', color: 'red' },
    { id: '5', name: 'Éducation', count: 1234, icon: '🎓', color: 'yellow' },
    { id: '6', name: 'Banques & MFI', count: 987, icon: '🏦', color: 'indigo' },
    { id: '7', name: 'Logistique', count: 1040, icon: '📦', color: 'orange' },
    { id: '8', name: 'Autres Secteurs', count: 512, icon: '🏢', color: 'gray' }
  ];

  getClasses(color: string): string {
    const map: any = {
      blue: 'bg-blue-50 border-blue-100',
      purple: 'bg-purple-50 border-purple-100',
      green: 'bg-green-50 border-green-100',
      red: 'bg-red-50 border-red-100',
      yellow: 'bg-yellow-50 border-yellow-100',
      indigo: 'bg-indigo-50 border-indigo-100',
      orange: 'bg-orange-50 border-orange-100',
      gray: 'bg-gray-50 border-gray-100'
    };
    return map[color] || map['gray'];
  }

  getIconClasses(color: string): string {
    const map: any = {
      blue: 'bg-blue-600 text-white',
      purple: 'bg-purple-600 text-white',
      green: 'bg-green-600 text-white',
      red: 'bg-red-600 text-white',
      yellow: 'bg-yellow-600 text-white',
      indigo: 'bg-indigo-600 text-white',
      orange: 'bg-orange-600 text-white',
      gray: 'bg-gray-600 text-white'
    };
    return map[color] || map['gray'];
  }

}
