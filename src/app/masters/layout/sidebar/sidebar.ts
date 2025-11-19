import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() sidebarOpen = false;
  @Output() sidebarClose = new EventEmitter<void>();

  userAvatar: string | null = null;
  username = 'Ritik Raj';

  constructor(private auth: AuthService) {}

  // This method emits an event to the parent.
  // The parent is responsible for updating the `sidebarOpen` state.
  closeSidebar(): void {
    this.sidebarClose.emit();
  }

  logout(): void {
    this.auth.logout();
  }
}
