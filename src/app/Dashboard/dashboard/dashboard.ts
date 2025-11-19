import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  gradient?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html', // Fixed path
  styleUrls: ['./dashboard.css'], // Fixed path
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  projectStats = {
    total: 17,
    running: 10,
    completed: 1,
    delayed: 5,
  };

  ticketStats = {
    total: 104,
    open: 2,
    closed: 102,
    hold: 0,
  };

  projectPieData: any[] = [];
  ticketPieData: any[] = [];

  ngOnInit(): void {
    this.projectPieData = [
      { name: 'Running', value: this.projectStats.running },
      { name: 'Completed', value: this.projectStats.completed },
      { name: 'Delayed', value: this.projectStats.delayed },
    ];

    this.ticketPieData = [
      { name: 'Open', value: this.ticketStats.open },
      { name: 'Closed', value: this.ticketStats.closed },
      { name: 'On Hold', value: this.ticketStats.hold },
    ];
  }

  // Stat cards
  statCards: StatCard[] = [
    { title: 'Total Projects', value: 17, icon: '📊', gradient: true },
    { title: 'Running Projects', value: 10, icon: '📈' },
    { title: 'Completed Projects', value: 1, icon: '✅' },
    { title: 'Delayed Projects', value: 5, icon: '⚠️' },
    { title: 'Total Tickets', value: 104, icon: '🎫', gradient: true },
    { title: 'Open Tickets', value: 2, icon: '⏳' },
    { title: 'Closed Tickets', value: 102, icon: '✔️' },
    { title: 'On Hold Tickets', value: 0, icon: '🛑' },
  ];
}