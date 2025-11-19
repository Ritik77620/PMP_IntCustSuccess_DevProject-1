import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; // ✅ Needed for routerLink
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true, // ✅ standalone component
  imports: [CommonModule, RouterModule], // ✅ adds routerLink and *ngIf support
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  userAvatar: string | null = null;
  username = 'Ritik Raj';

  constructor(private auth: AuthService) {}

  toggleSidebar(): void {
    this.sidebarToggle.emit(); // ✅ emits event to open/close sidebar
  }

  logout(): void {
    this.auth.logout(); // ✅ clean logout logic handled by AuthService
  }
}
