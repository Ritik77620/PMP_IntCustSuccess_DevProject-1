import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {
  sidebarOpen = false;
  username = 'Ritik Raj';
  userAvatar = 'assets/avatar.png'; // Replace with your avatar path

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  signOut() {
    // Clear user session data
    localStorage.clear();

    // ✅ Correct route after logout
    this.router.navigate(['/login']);
  }

  // Optional helper: navigate to a route and close sidebar
  navigateTo(path: string) {
    this.router.navigate([`/layout/${path}`]);
    this.closeSidebar();
  }
}
