import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Notification } from '../../model/notification.interface';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.scss'
})

export class NotificationCardComponent {
  @Input() notification!: Notification;
  @Output() markAsRead = new EventEmitter<string>();
  @Output() viewDetails = new EventEmitter<string>();
  @Output() deleteNotification = new EventEmitter<string>();
}
