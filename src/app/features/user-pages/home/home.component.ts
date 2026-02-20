import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from '../../../core/models/equipment';
import { EquipmentService } from '../../../core/services/equipment-store.service';
import { AuthService } from '../../../core/services/auth.service';

type EquipmentCondition = Equipment['condition'];

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchTerm = '';
  selectedCategory = 'All Categories';
  selectedCondition: 'All Conditions' | EquipmentCondition = 'All Conditions';

  dialogOpen = false;
  dialogTitle = '';
  dialogMessage = '';
  dialogConfirmText = 'OK';
  dialogCancelText = 'Cancel';
  dialogShowCancel = false;
  private dialogOnConfirm: (() => void) | null = null;

  requestedEquipment = new Set<string>();

  constructor(private readonly equipmentService: EquipmentService, private router: Router, private authService: AuthService) { }

  get equipments(): Equipment[] {
    return this.equipmentService.getAll();
  }

  get categories(): string[] {
    const unique = Array.from(new Set(this.equipments.map((e) => e.category))).sort();
    return ['All Categories', ...unique];
  }

  readonly conditions: Array<'All Conditions' | EquipmentCondition> = [
    'All Conditions',
    'Available',
    'In Use',
    'Under Repair'
  ];

  get filteredEquipments(): Equipment[] {
    const q = this.searchTerm.trim().toLowerCase();

    return this.equipments.filter((e) => {
      const matchesSearch =
        q.length === 0 ||
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);

      const matchesCategory =
        this.selectedCategory === 'All Categories' || e.category === this.selectedCategory;

      const matchesCondition =
        this.selectedCondition === 'All Conditions' || e.condition === this.selectedCondition;

      return matchesSearch && matchesCategory && matchesCondition;
    });
  }

  viewDetails(item: Equipment): void {
    const details = `Name: ${item.name}\nCategory: ${item.category}\nSerial: ${item.serialNumber}\nLocation: ${item.location}\nCondition: ${item.condition}`;
    this.openInfoDialog('Equipment Details', details);
  }

  requestEquipment(item: Equipment): void {
    if (item.condition !== 'Available') {
      return;
    }

    // Mark equipment as requested
    this.requestedEquipment.add(item.serialNumber);

    // Show success dialog
    this.openInfoDialog('Request Sent', `Your request for ${item.name} has been successfully submitted.`);
  }

  isRequested(item: Equipment): boolean {
    return this.requestedEquipment.has(item.serialNumber);
  }

  logout(): void {
    this.openConfirmDialog('Logout', 'Are you sure you want to logout?', () => {
      this.authService.logout();
    });
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.dialogOnConfirm = null;
  }

  confirmDialog(): void {
    const cb = this.dialogOnConfirm;
    this.closeDialog();
    if (cb) {
      cb();
    }
  }

  cancelDialog(): void {
    this.closeDialog();
  }

  private openInfoDialog(title: string, message: string): void {
    this.dialogTitle = title;
    this.dialogMessage = message;
    this.dialogConfirmText = 'OK';
    this.dialogCancelText = 'Cancel';
    this.dialogShowCancel = false;
    this.dialogOnConfirm = null;
    this.dialogOpen = true;
  }

  private openConfirmDialog(title: string, message: string, onConfirm: () => void): void {
    this.dialogTitle = title;
    this.dialogMessage = message;
    this.dialogConfirmText = 'Confirm';
    this.dialogCancelText = 'Cancel';
    this.dialogShowCancel = true;
    this.dialogOnConfirm = onConfirm;
    this.dialogOpen = true;
  }

  trackBySerial(_: number, item: Equipment): string {
    return item.serialNumber;
  }
}
