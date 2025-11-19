import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationConfig } from '../models/ticket.model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notification.show" 
         [class]="getNotificationClasses()"
         class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 flex items-center gap-3 min-w-80 max-w-md">
      <div [class]="getIconClasses()" class="p-1 rounded-full">
        <span *ngIf="notification.type === 'success'">✓</span>
        <span *ngIf="notification.type === 'error'">⚠</span>
      </div>
      <div class="flex-1">
        <p class="font-medium">
          {{ notification.type === 'success' ? 'Success!' : 'Error!' }}
        </p>
        <p class="text-sm">{{ notification.message }}</p>
      </div>
      <button (click)="onClose.emit()" 
              [class]="getCloseButtonClasses()"
              class="p-1 rounded-full hover:bg-opacity-20">
        ×
      </button>
    </div>
  `
})
export class NotificationComponent {
  @Input() notification!: NotificationConfig;
  @Output() onClose = new EventEmitter<void>();

  getNotificationClasses(): string {
    return this.notification.type === 'success' 
      ? 'bg-green-50 border-green-500 text-green-700' 
      : 'bg-red-50 border-red-500 text-red-700';
  }

  getIconClasses(): string {
    return this.notification.type === 'success' 
      ? 'bg-green-100 text-green-600' 
      : 'bg-red-100 text-red-600';
  }

  getCloseButtonClasses(): string {
    return this.notification.type === 'success' 
      ? 'hover:bg-green-600' 
      : 'hover:bg-red-600';
  }
}