import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './master.html',
  styleUrls: ['./master.css']
})
export class MastersComponent {
  constructor(private router: Router) {}

  masterCards = [
    { title: 'Project Master', description: 'Manage projects', buttonText: 'Manage Project Master' },
    { title: 'Milestone Master', description: 'Manage milestones', buttonText: 'Manage Milestone Master' },
    { title: 'Client Master', description: 'Manage clients', buttonText: 'Manage Client Master' },
    { title: 'Vendor Master', description: 'Manage vendors', buttonText: 'Manage Vendor Master' },
    { title: 'User Master', description: 'Manage users', buttonText: 'Manage User Master' },
    { title: 'Role Master', description: 'Manage roles', buttonText: 'Manage Role Master' }
  ];

  // ✅ All child routes are inside /layout
  getRoute(title: string): string {
    switch (title) {
      case 'Project Master': return '/layout/project-master';
      case 'Milestone Master': return '/layout/milestone-master';
      case 'Client Master': return '/layout/client-master';
      case 'Vendor Master': return '/layout/vendor-master';
      case 'User Master': return '/layout/user';
      case 'Role Master': return '/layout/role-master';
      default: return '/layout/dashboard';
    }
  }

  navigateTo(title: string) {
    const route = this.getRoute(title);
    this.router.navigate([route]);
  }
}
