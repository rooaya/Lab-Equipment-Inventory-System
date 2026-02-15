import { Component } from '@angular/core';
import { Equipment } from '../../../core/models/equipment';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
searchTerm = '';
editingEquipment: Equipment | null = null;
formData: Equipment = { name: '', category: '', serialNumber: '', location: '', condition: 'Available' };
isAddingEquipment: boolean = false;

  equipments: Equipment[] = [
    { name: 'Microscope BX-500', category: 'Microscopy', serialNumber: 'MS-2023-001', location: 'Lab A', condition: 'Available' },
    { name: 'Centrifuge Pro 3000', category: 'Centrifuges', serialNumber: 'CF-2023-045', location: 'Lab B', condition: 'In Use' },
    { name: 'PCR Machine Thermal', category: 'Molecular', serialNumber: 'PCR-2022-112', location: 'Lab A', condition: 'Available' },
    { name: 'Spectrophotometer UV', category: 'Spectroscopy', serialNumber: 'SP-2023-089', location: 'Lab C', condition: 'Under Repair' },
    { name: 'Incubator Shaker', category: 'General Lab', serialNumber: 'INC-2023-022', location: 'Lab B', condition: 'Available' }
  ];

  // Stats
  get totalEquipment() { return this.equipments.length; }
  get available() { return this.equipments.filter(e => e.condition === 'Available').length; }
  get inUse() { return this.equipments.filter(e => e.condition === 'In Use').length; }
  get maintenance() { return this.equipments.filter(e => e.condition === 'Under Repair').length; }

  // Filtered list for search
  get filteredEquipments(): Equipment[] {
    if (!this.searchTerm) return this.equipments;
    return this.equipments.filter(eq =>
      eq.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      eq.serialNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      eq.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Delete equipment
  deleteEquipment(equipment: Equipment) {
    if (confirm(`Are you sure you want to delete ${equipment.name}?`)) {
      this.equipments = this.equipments.filter(eq => eq !== equipment);
    }
  }

  // Open add modal
openAddForm() {
  this.formData = { name: '', category: '', serialNumber: '', location: '', condition: 'Available' };
  this.isAddingEquipment = true;
  this.editingEquipment = null;
}

// Open edit modal
openEditForm(equipment: Equipment) {
  this.formData = { ...equipment }; // copy data to form
  this.editingEquipment = equipment;
  this.isAddingEquipment = true;
}

// Add new equipment
addEquipment() {
  if (!this.formData.name || !this.formData.serialNumber) {
    alert('Please enter all required fields!');
    return;
  }
  this.equipments.push({ ...this.formData });
  this.isAddingEquipment = false;
}

// Update existing equipment
updateEquipment() {
  if (!this.editingEquipment) return;
  const index = this.equipments.findIndex(eq => eq.serialNumber === this.editingEquipment!.serialNumber);
  if (index !== -1) {
    this.equipments[index] = { ...this.formData };
    this.isAddingEquipment = false;
    this.editingEquipment = null;
  }
}

// Cancel modal
cancelForm() {
  this.isAddingEquipment = false;
  this.editingEquipment = null;
  this.formData = { name: '', category: '', serialNumber: '', location: '', condition: 'Available' };
}
}


