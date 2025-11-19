import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Permission {
  module: string;
  actions: string[];
}

interface Role {
  id?: number;
  name: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-role-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-master.html',
  styleUrls: ['./role-master.css']
})
export class RoleMasterComponent {
  modules = ['Dashboard', 'Projects', 'Ticket Tracker', 'Task Tracker', 'Masters'];
  actions = ['create', 'read', 'update', 'delete'];

  roles: Role[] = [];
  form: Role = { name: '', permissions: [] };
  showForm = false;
  editingIndex: number | null = null;

  // ✅ Toggle module-action permission
  togglePermission(module: string, action: string) {
    const existingModule = this.form.permissions.find(p => p.module === module);

    if (existingModule) {
      if (existingModule.actions.includes(action)) {
        existingModule.actions = existingModule.actions.filter(a => a !== action);
      } else {
        existingModule.actions.push(action);
      }
    } else {
      this.form.permissions.push({ module, actions: [action] });
    }
  }

  // ✅ Save role (no API, just in-memory)
  saveRole() {
    if (!this.form.name.trim()) {
      alert('Role name is required!');
      return;
    }

    if (this.editingIndex !== null) {
      this.roles[this.editingIndex] = { ...this.form };
      this.editingIndex = null;
    } else {
      this.roles.push({ ...this.form, id: Date.now() });
    }

    this.resetForm();
  }

  // ✅ Edit role
  editRole(index: number) {
    this.editingIndex = index;
    this.form = JSON.parse(JSON.stringify(this.roles[index]));
    this.showForm = true;
  }

  // ✅ Delete role
  deleteRole(index: number) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roles.splice(index, 1);
    }
  }

  // ✅ Cancel / Reset
  resetForm() {
    this.form = { name: '', permissions: [] };
    this.showForm = false;
  }

  // ✅ Check if a module-action is selected
  isChecked(module: string, action: string): boolean {
    const m = this.form.permissions.find(p => p.module === module);
    return !!m && m.actions.includes(action);
  }
}
