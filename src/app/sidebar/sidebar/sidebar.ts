import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import Lucide Angular icons - make sure you have lucide-angular installed
import { 
  LucideAngularModule,
  Menu,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Users,
  Folder,
  Settings,
  User,
  Bell
} from 'lucide-angular';

interface NavigationItem {
  title: string;
  route: string;
  icon: any;
  badge?: number;
}

interface UserData {
  name: string;
  designation: string;
  initials: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  // Icons
  menuIcon = Menu;
  chevronRightIcon = ChevronRight;
  logOutIcon = LogOut;

  // Navigation items
  navigationItems: NavigationItem[] = [
    { title: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { title: 'Projects', route: '/projects', icon: Folder, badge: 3 },
    { title: 'Ticket Tracker', route: '/team', icon: Users },
    { title: 'Task Tracker', route: '/notifications', icon: Bell, badge: 5 },
    { title: 'Masters', route: '/settings', icon: Settings }
  ];

  userItems: NavigationItem[] = [
    { title: 'Profile', route: '/profile', icon: User },
    { title: 'Settings', route: '/settings', icon: Settings }
  ];

  user: UserData = {
    name: 'John Doe',
    designation: 'Project Manager',
    initials: 'JD'
  };

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onLogout(): void {
    this.logoutEvent.emit();
  }

  // TrackBy function for better performance
  trackByTitle(index: number, item: NavigationItem): string {
    return item.title;
  }
}