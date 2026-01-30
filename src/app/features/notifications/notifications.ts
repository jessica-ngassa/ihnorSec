import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NotificationCardComponent } from '../../shared/components/notification-card/notification-card';
import { Notification, NotificationFilter } from '../../shared/model/notification.interface';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, NotificationCardComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class NotificationsComponent {
  filter = signal<NotificationFilter>('all');
  searchQuery = signal('');

  notifications = signal<Notification[]>([
    {
      id: '1',
      type: 'high-priority',
      icon: 'alert-circle',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      title: 'Critical: High-Risk Case Detected',
      message: 'Case #FR-2024-158 flagged with 95% fraud probability. Immediate action required.',
      time: '5 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'success',
      icon: 'check-circle',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      title: 'Case Resolved Successfully',
      message: 'Case #FR-2024-142 has been closed as legitimate after investigation.',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      icon: 'info',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      title: 'OCR Processing Complete',
      message: 'Batch upload of 45 documents completed. 3 documents require manual review.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '4',
      type: 'warning',
      icon: 'alert-circle',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
      title: 'New Case Assigned',
      message: 'You have been assigned to Case #FR-2024-159 - Duplicate Identity Detection.',
      time: '3 hours ago',
      read: true
    },
    {
      id: '5',
      type: 'info',
      icon: 'info',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      title: 'Weekly Digest Available',
      message: 'Your weekly summary report for January 20-26, 2026 is ready to view.',
      time: '1 day ago',
      read: true
    }
  ]);

  filteredNotifications = computed(() => {
    const notifications = this.notifications();
    const filter = this.filter();
    const search = this.searchQuery().toLowerCase();

    return notifications.filter(notif => {
      const matchesFilter = 
        filter === 'all' ? true :
        filter === 'unread' ? !notif.read :
        filter === 'high-priority' ? notif.type === 'high-priority' : true;
      
      const matchesSearch = 
        notif.title.toLowerCase().includes(search) ||
        notif.message.toLowerCase().includes(search);
      
      return matchesFilter && matchesSearch;
    });
  });

  unreadCount = computed(() => 
    this.notifications().filter(n => !n.read).length
  );

  setFilter(filter: NotificationFilter): void {
    this.filter.set(filter);
  }

  updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  markAsRead(id: string): void {
    this.notifications.update(notifications =>
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(notifications =>
      notifications.map(n => ({ ...n, read: true }))
    );
  }

  deleteNotification(id: string): void {
    this.notifications.update(notifications =>
      notifications.filter(n => n.id !== id)
    );
  }

  clearAll(): void {
    this.notifications.set([]);
  }

  viewDetails(id: string): void {
    console.log('View details for notification:', id);
  }
}