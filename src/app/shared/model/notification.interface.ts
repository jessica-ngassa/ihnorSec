export interface Notification {
  id: string;
  type: 'high-priority' | 'success' | 'info' | 'warning';
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export type NotificationFilter = 'all' | 'unread' | 'high-priority';