import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

interface Ticket {
  ticketNumber: string;
  clientName: string;
  location: string;
  dateRaised: string;
  timeRaised: string;
  category: string;
  raisedBy: string;
  assignedTo: string;
  status: string;
  priority: string;
  description: string;
  resolution: string;
}

interface Client {
  clientName: string;
}

interface Location {
  locationName: string;
}

interface Filters {
  status: string;
  clientName: string;
  priority: string;
}

interface Notification {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-ticket-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticketing-system.html',
  styleUrls: ['./ticketing-system.css']
})
export class TicketTrackingComponent implements OnInit {
  // Data arrays
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  clients: Client[] = [
    { clientName: 'Acme Corp' },
    { clientName: 'TechStart Inc' },
    { clientName: 'Global Solutions' },
    { clientName: 'Digital Ventures' }
  ];
  locations: Location[] = [
    { locationName: 'New York' },
    { locationName: 'London' },
    { locationName: 'Singapore' },
    { locationName: 'Mumbai' },
    { locationName: 'Toronto' }
  ];

  // Form state
  showForm = false;
  editingIndex: number | null = null;
  form: Ticket = this.getEmptyForm();

  // Filter state
  showFilters = false;
  filters: Filters = {
    status: '',
    clientName: '',
    priority: ''
  };

  // Filter options
  statusOptions = ['Open', 'Hold', 'Closed'];
  priorityOptions = ['Low', 'Medium', 'High'];
  clientOptions: string[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  startIndex = 0;
  endIndex = 10;
  currentTickets: Ticket[] = [];

  // Table columns
  tableColumns = [
    'Ticket #',
    'Client',
    'Location',
    'Date',
    'Time',
    'Category',
    'Raised By',
    'Assigned To',
    'Status',
    'Priority',
    'Resolution',
    'Actions'
  ];

  // Notification
  notification: Notification = {
    show: false,
    type: 'success',
    message: ''
  };

  // Math reference for template
  Math = Math;

  ngOnInit(): void {
    this.loadSampleData();
    this.clientOptions = this.clients.map(c => c.clientName);
    this.applyFilters();
  }

  loadSampleData(): void {
    this.tickets = [
      {
        ticketNumber: 'TKT-001',
        clientName: 'Acme Corp',
        location: 'New York',
        dateRaised: '2025-10-15',
        timeRaised: '09:30',
        category: 'Hardware',
        raisedBy: 'John Doe',
        assignedTo: 'Alice Smith',
        status: 'Open',
        priority: 'High',
        description: 'Printer not working in office',
        resolution: ''
      },
      {
        ticketNumber: 'TKT-002',
        clientName: 'TechStart Inc',
        location: 'London',
        dateRaised: '2025-10-20',
        timeRaised: '14:15',
        category: 'Software',
        raisedBy: 'Jane Smith',
        assignedTo: 'Bob Johnson',
        status: 'Closed',
        priority: 'Medium',
        description: 'Email access issue',
        resolution: 'Reset password and verified access'
      },
      {
        ticketNumber: 'TKT-003',
        clientName: 'Global Solutions',
        location: 'Singapore',
        dateRaised: '2025-10-25',
        timeRaised: '11:00',
        category: 'Network',
        raisedBy: 'Mike Wilson',
        assignedTo: 'Carol White',
        status: 'Hold',
        priority: 'Low',
        description: 'Slow internet connection',
        resolution: 'Waiting for ISP response'
      }
    ];
  }

  getEmptyForm(): Ticket {
    return {
      ticketNumber: '',
      clientName: '',
      location: '',
      dateRaised: '',
      timeRaised: '',
      category: '',
      raisedBy: '',
      assignedTo: '',
      status: 'Open',
      priority: 'Medium',
      description: '',
      resolution: ''
    };
  }

  onAddTicket(): void {
    this.showForm = true;
    this.editingIndex = null;
    this.form = this.getEmptyForm();
  }

  onEdit(index: number): void {
    const actualIndex = this.startIndex + index;
    const ticketToEdit = this.filteredTickets[actualIndex];
    this.editingIndex = this.tickets.findIndex(t => t.ticketNumber === ticketToEdit.ticketNumber);
    this.form = { ...ticketToEdit };
    this.showForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(index: number): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      const actualIndex = this.startIndex + index;
      const ticketToDelete = this.filteredTickets[actualIndex];
      const mainIndex = this.tickets.findIndex(t => t.ticketNumber === ticketToDelete.ticketNumber);
      
      if (mainIndex > -1) {
        this.tickets.splice(mainIndex, 1);
        this.showNotification('success', 'Ticket deleted successfully');
        this.applyFilters();
      }
    }
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.showNotification('error', 'Please fill all required fields');
      return;
    }

    if (this.editingIndex !== null) {
      // Update existing ticket
      this.tickets[this.editingIndex] = { ...this.form };
      this.showNotification('success', 'Ticket updated successfully');
    } else {
      // Create new ticket
      this.form.ticketNumber = this.generateTicketNumber();
      this.form.dateRaised = this.getCurrentDate();
      this.form.timeRaised = this.getCurrentTime();
      this.tickets.unshift({ ...this.form });
      this.showNotification('success', 'Ticket created successfully');
    }

    this.applyFilters();
    this.resetForm();
  }

  onCancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.showForm = false;
    this.editingIndex = null;
    this.form = this.getEmptyForm();
  }

  validateForm(): boolean {
    return !!(
      this.form.clientName &&
      this.form.location &&
      this.form.category &&
      this.form.raisedBy &&
      this.form.assignedTo &&
      this.form.description
    );
  }

  generateTicketNumber(): string {
    const count = this.tickets.length + 1;
    return `TKT-${count.toString().padStart(3, '0')}`;
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 5);
  }

  onFieldChange(field: string, value: string): void {
    // Handle any field-specific logic here
    console.log(`Field ${field} changed to ${value}`);
  }

  // Filter methods
  handleFilterChange(filterType: string, value: string): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTickets = this.tickets.filter(ticket => {
      const statusMatch = !this.filters.status || ticket.status === this.filters.status;
      const clientMatch = !this.filters.clientName || ticket.clientName === this.filters.clientName;
      const priorityMatch = !this.filters.priority || ticket.priority === this.filters.priority;
      return statusMatch && clientMatch && priorityMatch;
    });

    this.updatePagination();
  }

  clearFilters(): void {
    this.filters = {
      status: '',
      clientName: '',
      priority: ''
    };
    this.currentPage = 1;
    this.applyFilters();
  }

  get hasActiveFilters(): boolean {
    return !!(this.filters.status || this.filters.clientName || this.filters.priority);
  }

  // Summary counts
  getClosedCount(): number {
    return this.filteredTickets.filter(t => t.status === 'Closed').length;
  }

  getOpenCount(): number {
    return this.filteredTickets.filter(t => t.status === 'Open').length;
  }

  getHoldCount(): number {
    return this.filteredTickets.filter(t => t.status === 'Hold').length;
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTickets.length / this.itemsPerPage);
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.currentTickets = this.filteredTickets.slice(this.startIndex, this.endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  renderPaginationButtons(): number[] {
    const buttons: number[] = [];
    const maxButtons = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(this.totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  }

  // Status styling
  getStatusColor(status: string): string {
    switch (status) {
      case 'Open':
        return 'bg-red-500';
      case 'Hold':
        return 'bg-yellow-500';
      case 'Closed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }

  // Notification methods
  showNotification(type: 'success' | 'error', message: string): void {
    this.notification = { show: true, type, message };
    setTimeout(() => this.closeNotification(), 3000);
  }

  closeNotification(): void {
    this.notification.show = false;
  }

  // Export to Excel
  exportToExcel(): void {
    try {
      const dataToExport = this.filteredTickets.map(ticket => ({
        'Ticket Number': ticket.ticketNumber,
        'Client Name': ticket.clientName,
        'Location': ticket.location,
        'Date Raised': ticket.dateRaised,
        'Time Raised': ticket.timeRaised,
        'Category': ticket.category,
        'Raised By': ticket.raisedBy,
        'Assigned To': ticket.assignedTo,
        'Status': ticket.status,
        'Priority': ticket.priority,
        'Description': ticket.description,
        'Resolution': ticket.resolution
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Tickets');

      const fileName = `Tickets_${this.getCurrentDate()}.xlsx`;
      XLSX.writeFile(wb, fileName);

      this.showNotification('success', 'Excel file exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      this.showNotification('error', 'Failed to export Excel file');
    }
  }
}