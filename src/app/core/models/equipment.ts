export interface Equipment {
  name: string;
  category: string;
  serialNumber: string;
  location: string;
  condition: 'Available' | 'In Use' | 'Under Repair';
}
