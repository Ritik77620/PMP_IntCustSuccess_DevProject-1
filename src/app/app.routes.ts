import { Routes } from '@angular/router';

// --- Dashboard & Projects ---
import { DashboardComponent } from './Dashboard/dashboard/dashboard';
import { ProjectsComponent } from './projects/projects';

// --- Masters ---
import { MastersComponent } from './masters/master/master';
import { UserMasterComponent } from './masters/users/users';
import { RoleMasterComponent } from './role-master/role-master';
import { ProjectMasterComponent } from './masters/project-master/project-master';
import { MilestoneMasterComponent } from './masters/mileston-master/mileston-master';
import { ClientMasterComponent } from './masters/client-master/client-master';
import { VendorMasterComponent } from './masters/vendor-master/vendor-master';
import { TicketTrackingComponent } from './ticketing-system/ticketing-system';

// --- Layout & Auth ---
import { LayoutComponent } from './masters/layout/layout';
import { LoginComponent } from './masters/login/login';
import { TaskTrackerComponent } from './task-tracker/task-tracker';

export const routes: Routes = [
  // --- Default route ---
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // --- Login page ---
  { path: 'login', component: LoginComponent },

  // --- Main layout with child routes ---
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'masters', component: MastersComponent },
      { path: 'user', component: UserMasterComponent },
      { path: 'role-master', component: RoleMasterComponent },
      { path: 'project-master', component: ProjectMasterComponent },
      { path: 'milestone-master', component: MilestoneMasterComponent },
      { path: 'client-master', component: ClientMasterComponent },
      { path: 'vendor-master', component: VendorMasterComponent },
      { path: 'task-tracker', component: TaskTrackerComponent },
      { path: 'ticketing', component: TicketTrackingComponent },
    ],
  },

  // --- Wildcard route (fallback to layout/dashboard instead of login) ---
  { path: '**', redirectTo: 'layout/dashboard' },
];
