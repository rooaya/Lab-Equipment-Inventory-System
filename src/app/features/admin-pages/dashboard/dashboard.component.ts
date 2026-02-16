import { Component } from '@angular/core';
import { Equipment } from '../../../core/models/equipment';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '../../../core/services/equipment-store.service';

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

  constructor(private readonly equipmentService: EquipmentService) { }

  get equipments(): Equipment[] {
    return this.equipmentService.getAll();
  }

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

    deleteEquipment(equipment: Equipment) {
    if (confirm(`Are you sure you want to delete ${equipment.name}?`)) {
      this.equipmentService.removeBySerialNumber(equipment.serialNumber);
    }
  }

  openAddForm() {
    this.formData = { name: '', category: '', serialNumber: '', location: '', condition: 'Available' };
    this.isAddingEquipment = true;
    this.editingEquipment = null;
  }

  openEditForm(equipment: Equipment) {
    this.formData = { ...equipment };
    this.editingEquipment = equipment;
    this.isAddingEquipment = true;
  }

  addEquipment() {
    if (!this.formData.name || !this.formData.serialNumber) {
      alert('Please enter all required fields!');
      return;
    }
    this.equipmentService.add({ ...this.formData });
    this.isAddingEquipment = false;
  }

  // Update existing equipment
  updateEquipment() {
    if (!this.editingEquipment) return;
    this.equipmentService.updateBySerialNumber(this.editingEquipment.serialNumber, { ...this.formData });
    this.isAddingEquipment = false;
    this.editingEquipment = null;
  }

  // Cancel modal
  cancelForm() {
    this.isAddingEquipment = false;
    this.editingEquipment = null;
    this.formData = { name: '', category: '', serialNumber: '', location: '', condition: 'Available' };
  }
}


