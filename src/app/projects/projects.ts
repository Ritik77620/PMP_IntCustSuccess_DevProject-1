import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Project {
  code: string;
  name: string;
  type: string;
  client: string;
  location: string;
  unit: string;
  milestone: string;
  planStart: string;
  planEnd: string;
  actualStart: string;
  status: 'Running' | 'Completed' | 'Delayed' | 'OnHold';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent {

  // Dashboard summary values
  totalProjects = 17;
  running = 10;
  completed = 1;
  delayed = 5;
  onHold = 1;

  // Tab filter
  activeTab: string = 'All';

  // Modal control
  isModalOpen = false;
  isSubmitting = false;

  // Reactive Form
  projectForm!: FormGroup;

  // Dropdown options
  projectTypes = ['ProEfficient', 'Digitization of Check-sheets', 'Automation', 'Analytics'];
  clients = ['Polyrub Plastics Pvt. Ltd.', 'HGI Automotives Pvt. Ltd.', 'ABC Industries'];
  locations = ['Kushkhera', 'Sector 58, Faridabad', 'Bawal', 'Manesar'];
  units = ['Unit 1', 'Unit 2', 'Unit 3'];
  milestones = ['Go Live', 'UAT', 'Development', 'Planning'];

  // Project Data
  projects: Project[] = [
    {
      code: 'POL-PRO-017',
      name: 'PMS-POLYRUB',
      type: 'ProEfficient',
      client: 'Polyrub Plastics Pvt. Ltd.',
      location: 'Kushkhera',
      unit: 'Unit 1',
      milestone: 'Go Live',
      planStart: '2025-09-01',
      planEnd: '2025-09-30',
      actualStart: '-',
      status: 'Running'
    },
    {
      code: 'HGI-DIG-016',
      name: 'Digitalization of Checksheet',
      type: 'Digitization of Check-sheets',
      client: 'HGI Automotives Pvt. Ltd.',
      location: 'Sector 58, Faridabad',
      unit: 'Unit 1',
      milestone: 'Go Live',
      planStart: '2025-09-16',
      planEnd: '2025-10-31',
      actualStart: '-',
      status: 'Running'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  // ✅ Initialize reactive form
  initForm() {
    this.projectForm = this.fb.group({
      project: ['', Validators.required],
      projectType: ['', Validators.required],
      client: ['', Validators.required],
      location: ['', Validators.required],
      unit: ['', Validators.required],
      milestone: ['', Validators.required],
      planStart: ['', Validators.required],
      planClose: ['', Validators.required]
    });
  }

  // ✅ Shortcut getter for form controls
  get f() {
    return this.projectForm.controls;
  }

  // ✅ Open modal
  openModal() {
    this.isModalOpen = true;
  }

  // ✅ Cancel / Close modal
  onCancel() {
    this.isModalOpen = false;
    this.projectForm.reset();
  }

  // ✅ Handle form submission
  onSubmit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate async submission
    setTimeout(() => {
      const formData = this.projectForm.value;

      const newProject: Project = {
        code: `NEW-${this.projects.length + 1}`,
        name: formData.project,
        type: formData.projectType,
        client: formData.client,
        location: formData.location,
        unit: formData.unit,
        milestone: formData.milestone,
        planStart: formData.planStart,
        planEnd: formData.planClose,
        actualStart: '-',
        status: 'Running'
      };

      // Add new project
      this.projects.push(newProject);

      // Update summary stats
      this.totalProjects++;
      this.running++;

      // Reset form and close modal
      this.projectForm.reset();
      this.isSubmitting = false;
      this.isModalOpen = false;
    }, 1000);
  }

  // ✅ Tab switcher
  setTab(tab: string) {
    this.activeTab = tab;
  }

  // ✅ Filter projects based on active tab
  get filteredProjects() {
    switch (this.activeTab) {
      case 'Project Delayed':
        return this.projects.filter(p => p.status === 'Delayed');
      case 'Milestone Delayed':
        return this.projects.filter(p => p.status === 'Delayed');
      case 'On Hold':
        return this.projects.filter(p => p.status === 'OnHold');
      case 'Running':
        return this.projects.filter(p => p.status === 'Running');
      case 'Completed':
        return this.projects.filter(p => p.status === 'Completed');
      default:
        return this.projects;
    }
  }
}
