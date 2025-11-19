import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Role {
  _id: string;
  name: string;
}

interface User {
  _id?: string;
  name: string;
  userId: string;
  passCode: string;
  role?: string;
  roleName?: string;
  email: string;
}

@Component({
  selector: 'user-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UserMasterComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  showForm = false;
  isSaving = false;
  loading = true;

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      userId: ['', Validators.required],
      passCode: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  // ✅ Using mock local data instead of API
  fetchData(): void {
    this.loading = true;

    // Mock role data
    this.roles = [
      { _id: '1', name: 'Admin' },
      { _id: '2', name: 'Manager' },
      { _id: '3', name: 'Operator' }
    ];

    // Mock user data
    this.users = [
      {
        _id: 'u1',
        name: 'Ritik Raj',
        userId: 'ritik123',
        passCode: '12345',
        role: '1',
        roleName: 'Admin',
        email: 'ritik@example.com'
      },
      {
        _id: 'u2',
        name: 'Amit Kumar',
        userId: 'amit123',
        passCode: 'abcde',
        role: '2',
        roleName: 'Manager',
        email: 'amit@example.com'
      }
    ];

    this.loading = false;
  }

  openForm(user?: User): void {
    if (user) {
      this.userForm.patchValue(user);
    } else {
      this.userForm.reset();
    }
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.userForm.reset();
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    this.isSaving = true;
    const userData = this.userForm.value;

    if (userData._id) {
      // Update existing user
      const index = this.users.findIndex(u => u._id === userData._id);
      if (index !== -1) {
        const roleName = this.roles.find(r => r._id === userData.role)?.name || 'No Role';
        this.users[index] = { ...userData, roleName };
        alert('User updated successfully!');
      }
    } else {
      // Create new user
      const newUser: User = {
        ...userData,
        _id: 'u' + (this.users.length + 1),
        roleName: this.roles.find(r => r._id === userData.role)?.name || 'No Role'
      };
      this.users.push(newUser);
      alert('User created successfully!');
    }

    this.cancelForm();
    this.isSaving = false;
  }

  deleteUser(id: string): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.users = this.users.filter(u => u._id !== id);
    alert('User deleted successfully!');
  }

  navigateToRole(): void {
    this.router.navigate(['/role-master']);
  }
}
