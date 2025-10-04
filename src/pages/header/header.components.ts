import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, Bell, Sun, Moon, User, Search } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  // Icons
  menuIcon = Menu;
  searchIcon = Search;
  bellIcon = Bell;
  sunIcon = Sun;
  moonIcon = Moon;
  userIcon = User;

  // Add this
  userAvatar: string | null = 'C:/Users/hp/Downloads/WhatsApp Image 2025-09-29 at 15.59.54_c7495ff4.jpg'; // replace with your actual URL
}
