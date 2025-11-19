// vendor-master.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Vendor {
  id: string;
  vendorName: string;
  vendorLocation: string;
  vendorGst: string;
  email: string;
  spoc: string;
}

@Component({
  selector: 'app-vendor-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor-master.html',
  styleUrls: ['./vendor-master.css']
})
export class VendorMasterComponent implements OnInit {
  vendors: Vendor[] = [];
  form: Omit<Vendor, "id"> & { id?: string } = {
    vendorName: "",
    vendorLocation: "",
    vendorGst: "",
    email: "",
    spoc: "",
  };
  showForm = false;

  private readonly STORAGE_KEY = 'vendors_data';

  ngOnInit() {
    this.loadVendors();
  }

  private loadVendors() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.vendors = JSON.parse(stored);
    } else {
      // Initial dummy data
      this.vendors = [
        {
          id: this.generateId(),
          vendorName: "Tech Solutions Ltd",
          vendorLocation: "Mumbai",
          vendorGst: "GSTIN123456",
          email: "contact@techsolutions.com",
          spoc: "Rahul Verma"
        },
        {
          id: this.generateId(),
          vendorName: "Global Suppliers Inc",
          vendorLocation: "Delhi",
          vendorGst: "GSTIN789012",
          email: "info@globalsuppliers.com",
          spoc: "Priya Patel"
        },
        {
          id: this.generateId(),
          vendorName: "Quality Products Co",
          vendorLocation: "Bangalore",
          vendorGst: "GSTIN345678",
          email: "sales@qualityproducts.com",
          spoc: "Ankit Sharma"
        }
      ];
      this.saveToLocalStorage();
    }
    this.sortVendors();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.vendors));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private sortVendors() {
    this.vendors.sort((a, b) => a.vendorName.localeCompare(b.vendorName));
  }

  handleChange(field: keyof Omit<Vendor, 'id'>, value: string) {
    this.form = { ...this.form, [field]: value };
  }

  handleSave() {
    if (!this.form.vendorName.trim()) {
      alert("Vendor Name is required");
      return;
    }

    const payload = {
      vendorName: this.form.vendorName.trim(),
      vendorLocation: this.form.vendorLocation.trim(),
      vendorGst: this.form.vendorGst.trim(),
      email: this.form.email.trim(),
      spoc: this.form.spoc.trim(),
    };

    if (this.form.id) {
      // Update existing vendor
      const index = this.vendors.findIndex(v => v.id === this.form.id);
      if (index !== -1) {
        this.vendors[index] = { ...this.vendors[index], ...payload };
      }
    } else {
      // Add new vendor
      const newVendor: Vendor = {
        ...payload,
        id: this.generateId()
      };
      this.vendors.push(newVendor);
    }

    this.saveToLocalStorage();
    this.sortVendors();
    this.resetForm();
    this.showForm = false;
  }

  handleEdit(id: string) {
    const vendor = this.vendors.find(v => v.id === id);
    if (vendor) {
      this.form = { ...vendor };
      this.showForm = true;
    }
  }

  handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this vendor?")) return;
    
    this.vendors = this.vendors.filter(v => v.id !== id);
    this.saveToLocalStorage();
  }

  resetForm() {
    this.form = {
      vendorName: "",
      vendorLocation: "",
      vendorGst: "",
      email: "",
      spoc: "",
    };
  }

  cancelForm() {
    this.showForm = false;
    this.resetForm();
  }

  showAddForm() {
    this.resetForm();
    this.showForm = true;
  }
}