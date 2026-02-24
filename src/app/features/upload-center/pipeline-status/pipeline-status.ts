import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface Job {
  id: string;
  status: 'PREPARING' | 'UPLOADING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  fileName: string;
  type: 'DATA' | 'OCR';
  createdAt: Date;
}

@Component({
  selector: 'app-pipeline-status',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pipeline-status.html',
  styleUrls: ['./pipeline-status.scss']
})
export class PipelineStatusComponent implements OnInit {
  private router = inject(Router);

  // Get jobs from router state or initialize empty
  jobs = signal<Job[]>([]);

  // Computed signals for job counts
  activeJobsCount = computed(() =>
    this.jobs().filter(j => ['PREPARING', 'UPLOADING', 'PROCESSING'].includes(j.status)).length
  );

  completedJobsCount = computed(() =>
    this.jobs().filter(j => j.status === 'COMPLETED').length
  );

  failedJobsCount = computed(() =>
    this.jobs().filter(j => j.status === 'FAILED').length
  );

  totalJobsCount = computed(() => this.jobs().length);

  // Sorted jobs
  sortedJobs = computed(() => {
    return this.jobs().sort((a, b) => {
      // Recent first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });

  ngOnInit() {
    // Get jobs from router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['activeJobs']) {
      this.jobs.set(navigation.extras.state['activeJobs']);
    }
  }

  getStatusColor(status: Job['status']): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'FAILED':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'PROCESSING':
      case 'UPLOADING':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'PREPARING':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }

  getStatusIcon(status: Job['status']): string {
    switch (status) {
      case 'COMPLETED':
        return 'check-circle-2';
      case 'FAILED':
        return 'alert-circle';
      case 'PROCESSING':
      case 'UPLOADING':
        return 'loader-2';
      case 'PREPARING':
        return 'clock';
      default:
        return 'help-circle';
    }
  }

  getProgressColor(progress: number): string {
    if (progress < 25) return 'bg-yellow-500';
    if (progress < 75) return 'bg-blue-500';
    return 'bg-green-500';
  }

  goBack(): void {
    this.router.navigate(['/upload']);
  }

  retryJob(job: Job): void {
    console.log('Retry job:', job.id);
    // Implement job retry logic if needed
  }

  cancelJob(job: Job): void {
    console.log('Cancel job:', job.id);
    // Implement job cancellation logic if needed
  }
}
