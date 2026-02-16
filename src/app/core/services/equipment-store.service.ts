import { Injectable } from '@angular/core';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private equipments: Equipment[] = [
    { name: 'Microscope BX-500', category: 'Microscopy', serialNumber: 'MS-2023-001', location: 'Lab A', condition: 'Available' },
    { name: 'Centrifuge Pro 3000', category: 'Centrifuges', serialNumber: 'CF-2023-045', location: 'Lab B', condition: 'In Use' },
    { name: 'PCR Machine Thermal', category: 'Molecular', serialNumber: 'PCR-2022-112', location: 'Lab A', condition: 'Available' },
    { name: 'Spectrophotometer UV', category: 'Spectroscopy', serialNumber: 'SP-2023-089', location: 'Lab C', condition: 'Under Repair' },
    { name: 'Incubator Shaker', category: 'General Lab', serialNumber: 'INC-2023-022', location: 'Lab B', condition: 'Available' }
  ];


  getAll(): Equipment[] {
    return this.equipments;
  }

  add(equipment: Equipment): void {
    this.equipments.push(equipment);
  }

  updateBySerialNumber(serialNumber: string, updatedEquipment: Equipment): void {
    const index = this.equipments.findIndex(e => e.serialNumber === serialNumber);
    if (index !== -1) {
      this.equipments[index] = updatedEquipment;
    }
  }

  removeBySerialNumber(serialNumber: string): void {
    this.equipments = this.equipments.filter(e => e.serialNumber !== serialNumber);
  }
}
