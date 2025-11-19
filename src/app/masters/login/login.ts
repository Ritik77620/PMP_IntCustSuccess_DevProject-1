import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login() {
    console.log('Login clicked:', this.username, this.password); // Debugging line
    if (this.username === 'admin' && this.password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/layout']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
