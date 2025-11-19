// milestone-master.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Milestone {
  id: string;
  name: string;
  weightage: number;
}

@Component({
  selector: 'app-milestone-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mileston-master.html',
  styleUrls: ['./mileston-master.css']
})
export class MilestoneMasterComponent implements OnInit {
  milestones: Milestone[] = [];
  mileForm: Milestone = { id: '', name: '', weightage: 0 };
  showMileForm = false;

  // Local storage key for persistence
  private readonly STORAGE_KEY = 'milestones_data';

  ngOnInit() {
    this.loadMilestones();
  }

  // Load milestones from localStorage
  private loadMilestones() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.milestones = JSON.parse(stored);
    } else {
      // Initial dummy data
      this.milestones = [
        { id: '1', name: 'Design Phase', weightage: 30 },
        { id: '2', name: 'Development', weightage: 50 },
        { id: '3', name: 'Testing', weightage: 20 }
      ];
      this.saveToLocalStorage();
    }
  }

  // Save to localStorage
  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.milestones));
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Show add form
  showAddForm() {
    this.mileForm = { id: '', name: '', weightage: 0 };
    this.showMileForm = true;
  }

  // Save milestone (Create or Update)
  handleMileSave() {
    if (!this.mileForm.name || this.mileForm.weightage <= 0) {
      alert('Please enter valid name and weightage');
      return;
    }

    if (this.mileForm.id) {
      // Update existing milestone
      const index = this.milestones.findIndex(m => m.id === this.mileForm.id);
      if (index !== -1) {
        this.milestones[index] = { ...this.mileForm };
      }
    } else {
      // Add new milestone
      const newMilestone: Milestone = {
        ...this.mileForm,
        id: this.generateId()
      };
      this.milestones.push(newMilestone);
    }

    this.saveToLocalStorage();
    this.showMileForm = false;
    this.mileForm = { id: '', name: '', weightage: 0 };
  }

  // Delete milestone
  handleMileDelete(id: string) {
    if (!confirm('Delete this milestone?')) return;
    
    this.milestones = this.milestones.filter(m => m.id !== id);
    this.saveToLocalStorage();
  }

  // Edit milestone
  handleMileEdit(id: string) {
    const milestone = this.milestones.find(m => m.id === id);
    if (milestone) {
      this.mileForm = { ...milestone };
      this.showMileForm = true;
    }
  }

  // Cancel form
  cancelForm() {
    this.showMileForm = false;
    this.mileForm = { id: '', name: '', weightage: 0 };
  }
}