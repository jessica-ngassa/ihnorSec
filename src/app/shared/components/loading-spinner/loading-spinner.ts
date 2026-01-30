import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="h-screen flex items-center justify-center text-gray-400">
      <div class="flex flex-col items-center gap-3">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F3A7D]"></div>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
  `
})
export class LoadingSpinner {
  @Input() message = 'Loading...';
}