import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Project {
  _id?: string;
  projectName: string;
  description: string;
}

@Component({
  selector: 'app-project-master',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './project-master.html',
  styleUrls: ['./project-master.css']
})
export class ProjectMasterComponent implements OnInit {
  form!: FormGroup;
  projects: Project[] = [];
  showForm = false;
  displayedColumns: string[] = ['projectName', 'description', 'actions'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      _id: [''],
      projectName: ['', Validators.required],
      description: ['']
    });

    // Example projects
    this.projects = [
      { _id: '1', projectName: 'Project A', description: 'Description A' },
      { _id: '2', projectName: 'Project B', description: 'Description B' }
    ];
  }

  addNew() {
    this.form.reset();
    this.showForm = true;
  }

  saveProject() {
    if (this.form.invalid) return;

    const project: Project = this.form.value;

    if (project._id) {
      // Edit existing
      this.projects = this.projects.map(p => (p._id === project._id ? project : p));
    } else {
      // Add new
      project._id = Math.random().toString(36).substr(2, 9);
      this.projects.push(project);
    }

    this.showForm = false;
    this.form.reset();
  }

  editProject(project: Project) {
    this.form.setValue({
      _id: project._id,
      projectName: project.projectName,
      description: project.description
    });
    this.showForm = true;
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects = this.projects.filter(p => p._id !== id);
    }
  }

  cancel() {
    this.showForm = false;
    this.form.reset();
  }
}
