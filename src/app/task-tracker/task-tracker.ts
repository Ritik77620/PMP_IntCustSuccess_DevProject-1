import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  _id?: string;
  raisedDate?: string;
  assignedTo: string;
  type: string;
  client: string;
  issue: string;
  produceStep: string;
  sampleData: string;
  acceptanceCriteria: string;
  status: string;
  expectedClosureDate: string;
  actualClosureDate: string;
  testingStatus: string;
  testingDoneBy: string;
}

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-tracker.html',
  styleUrls: ['./task-tracker.css']
})
export class TaskTrackerComponent implements OnInit {
  tasks: Task[] = [];
  form: Task = this.getEmptyForm();
  showForm = false;

  ngOnInit() {
    // Optionally, add some dummy data
    this.tasks = [
      {
        _id: '1',
        raisedDate: this.formatDate(new Date()),
        assignedTo: 'Ritik',
        type: 'Bug',
        client: 'Client A',
        issue: 'Login issue',
        produceStep: 'Step 1',
        sampleData: 'Sample 1',
        acceptanceCriteria: 'Works',
        status: 'Open',
        expectedClosureDate: this.formatDate(new Date()),
        actualClosureDate: '',
        testingStatus: 'Pending',
        testingDoneBy: ''
      }
    ];
  }

  getEmptyForm(): Task {
    return {
      assignedTo: "",
      type: "",
      client: "",
      issue: "",
      produceStep: "",
      sampleData: "",
      acceptanceCriteria: "",
      status: "",
      expectedClosureDate: "",
      actualClosureDate: "",
      testingStatus: "",
      testingDoneBy: "",
    };
  }

  onFieldChange(field: keyof Task, value: string) {
    this.form = { ...this.form, [field]: value };
  }

  onSave() {
    if (!this.form.client || !this.form.issue) return;

    if (this.form._id) {
      // Edit existing task
      const index = this.tasks.findIndex(t => t._id === this.form._id);
      if (index > -1) this.tasks[index] = { ...this.form };
    } else {
      // Add new task
      this.form._id = Date.now().toString(); // simple unique id
      this.form.raisedDate = this.formatDate(new Date());
      this.tasks.push({ ...this.form });
    }

    this.resetForm();
    this.showForm = false;
  }

  onEdit(task: Task) {
    this.form = { ...task };
    this.showForm = true;
  }

  onDelete(_id?: string) {
    if (!_id) return;
    this.tasks = this.tasks.filter(t => t._id !== _id);
  }

  formatDate(date?: string | Date): string {
    if (!date) return "";
    const d = typeof date === 'string' ? new Date(date) : date;
    return isNaN(d.getTime()) ? '' : d.toISOString().split("T")[0];
  }

  resetForm() {
    this.form = this.getEmptyForm();
  }

  onCancel() {
    this.showForm = false;
    this.resetForm();
  }

  onAddNew() {
    this.showForm = true;
    this.resetForm();
  }

  // Stats properties
  get totalTasks(): number {
    return this.tasks.length;
  }

  get openTasks(): number {
    return this.tasks.filter((t) => t.status === "Open").length;
  }

  get inProgressTasks(): number {
    return this.tasks.filter((t) => t.status === "In Progress").length;
  }

  get closedTasks(): number {
    return this.tasks.filter((t) => t.status === "Closed").length;
  }
}
