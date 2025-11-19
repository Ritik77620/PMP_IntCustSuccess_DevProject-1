// client-master.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

interface Unit {
  unitName: string;
}

interface Location {
  locationName: string;
  spoc: string;
  units: Unit[];
}

interface Client {
  _id?: string;
  clientName: string;
  gst: string;
  email: string;
  locations: Location[];
}

@Component({
  selector: 'app-client-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-master.html',
  styleUrls: ['./client-master.css']
})
export class ClientMasterComponent implements OnInit {
  clients: Client[] = [];
  form: Client = {
    clientName: "",
    gst: "",
    email: "",
    locations: [{ locationName: "", spoc: "", units: [{ unitName: "" }] }],
  };
  showForm = false;
  deleteId: string | null = null;

  private readonly STORAGE_KEY = 'clients_data';

  ngOnInit() {
    this.loadClients();
  }

  private loadClients() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.clients = JSON.parse(stored);
    } else {
      // Initial dummy data
      this.clients = [
        {
          _id: this.generateId(),
          clientName: "ABC Corporation",
          gst: "GST123456",
          email: "contact@abccorp.com",
          locations: [
            {
              locationName: "Mumbai",
              spoc: "Raj Sharma",
              units: [{ unitName: "IT Department" }, { unitName: "HR Department" }]
            }
          ]
        },
        {
          _id: this.generateId(),
          clientName: "XYZ Industries",
          gst: "GST789012",
          email: "info@xyzind.com",
          locations: [
            {
              locationName: "Delhi",
              spoc: "Priya Singh",
              units: [{ unitName: "Development" }]
            },
            {
              locationName: "Bangalore",
              spoc: "Arun Kumar",
              units: [{ unitName: "Research" }, { unitName: "Testing" }]
            }
          ]
        }
      ];
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.clients));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  handleChange(field: keyof Client, value: string) {
    this.form = { ...this.form, [field]: value };
  }

  handleLocationChange(index: number, field: 'locationName' | 'spoc', value: string) {
    const updated = [...this.form.locations];
    updated[index] = { ...updated[index], [field]: value };
    this.form = { ...this.form, locations: updated };
  }

  handleUnitChange(locIndex: number, unitIndex: number, value: string) {
    const updatedLocations = [...this.form.locations];
    const updatedUnits = [...updatedLocations[locIndex].units];
    updatedUnits[unitIndex] = { unitName: value };
    updatedLocations[locIndex] = { 
      ...updatedLocations[locIndex], 
      units: updatedUnits 
    };
    this.form = { ...this.form, locations: updatedLocations };
  }

  addLocation() {
    this.form = {
      ...this.form,
      locations: [
        ...this.form.locations, 
        { locationName: "", spoc: "", units: [{ unitName: "" }] }
      ],
    };
  }

  addUnit(locIndex: number) {
    const updated = [...this.form.locations];
    updated[locIndex] = {
      ...updated[locIndex],
      units: [...updated[locIndex].units, { unitName: "" }]
    };
    this.form = { ...this.form, locations: updated };
  }

  handleSave() {
    // Validation
    if (!this.form.clientName.trim() || !this.form.email.trim()) {
      alert("Client Name and Email are required");
      return;
    }

    const payload: Client = {
      ...this.form,
      clientName: this.capitalize(this.form.clientName.trim()),
      locations: this.form.locations
        .filter(loc => loc.locationName.trim() !== "")
        .map(loc => ({
          locationName: this.capitalize(loc.locationName.trim()),
          spoc: this.capitalize(loc.spoc.trim()),
          units: loc.units
            .filter(u => u.unitName.trim() !== "")
            .map(u => ({ unitName: this.capitalize(u.unitName.trim()) })),
        })),
    };

    if (this.form._id) {
      // Update existing client
      const index = this.clients.findIndex(c => c._id === this.form._id);
      if (index !== -1) {
        this.clients[index] = { ...payload };
      }
    } else {
      // Add new client
      const newClient: Client = {
        ...payload,
        _id: this.generateId()
      };
      this.clients.push(newClient);
    }

    this.saveToLocalStorage();
    this.resetForm();
    this.showForm = false;
  }

  confirmDelete() {
    if (!this.deleteId) return;
    
    this.clients = this.clients.filter(c => c._id !== this.deleteId);
    this.saveToLocalStorage();
    this.deleteId = null;
  }

  handleEdit(id: string) {
    const client = this.clients.find(c => c._id === id);
    if (client) {
      this.form = JSON.parse(JSON.stringify(client)); // Deep clone
      this.showForm = true;
    }
  }

  resetForm() {
    this.form = {
      clientName: "",
      gst: "",
      email: "",
      locations: [{ locationName: "", spoc: "", units: [{ unitName: "" }] }],
    };
  }

  cancelForm() {
    this.showForm = false;
    this.resetForm();
  }

  setDeleteId(id: string) {
    this.deleteId = id;
  }

  getSortedClients(): Client[] {
    return this.clients.slice().sort((a, b) => a.clientName.localeCompare(b.clientName));
  }

  getLocationNames(locations: Location[]): string {
    return locations.map(l => l.locationName).join(", ");
  }

  getSPOCs(locations: Location[]): string {
    return locations.map(l => l.spoc).join(", ");
  }

  getUnitNames(locations: Location[]): string {
    return locations
      .map(l => l.units?.map(u => u.unitName).join(", "))
      .filter(u => u)
      .join("; ");
  }
}