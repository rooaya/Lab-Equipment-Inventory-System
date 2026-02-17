import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Request {
  id: number;
  equipmentName: string;
  category: string;
  serialNumber: string;
  location: string;
  requestedBy: string;
  requestDate: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

@Component({
  selector: 'app-requests',
  standalone: false,
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
  searchTerm = '';
  statusFilter = '';
  showRequestModal = false;
  editingRequest: Request | null = null;
  
  requestForm = {
    equipmentName: '',
    category: '',
    serialNumber: '',
    location: '',
    requestedBy: '',
    notes: ''
  };

  requests: Request[] = [
    {
      id: 1,
      equipmentName: 'Microscope Model X200',
      category: 'Laboratory Equipment',
      serialNumber: 'MIC-2024-001',
      location: 'Lab Room A',
      requestedBy: 'John Doe',
      requestDate: new Date('2025-01-15'),
      status: 'Pending',
      notes: 'Needed for research project'
    },
    {
      id: 2,
      equipmentName: 'Centrifuge Pro',
      category: 'Laboratory Equipment',
      serialNumber: 'CEN-2024-002',
      location: 'Lab Room B',
      requestedBy: 'Jane Smith',
      requestDate: new Date('2025-01-14'),
      status: 'Approved',
      notes: 'Urgent requirement'
    },
    {
      id: 3,
      equipmentName: 'Digital Scale DS-500',
      category: 'Measurement Tools',
      serialNumber: 'DSC-2024-003',
      location: 'Storage Room',
      requestedBy: 'Mike Johnson',
      requestDate: new Date('2025-01-13'),
      status: 'Rejected',
      notes: 'Equipment not available'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    // Check for query parameters from home page navigation
    this.route.queryParams.subscribe(params => {
      if (params['equipmentName']) {
        // Pre-fill the form with equipment details from home page
        this.requestForm = {
          equipmentName: params['equipmentName'] || '',
          category: params['category'] || '',
          serialNumber: params['serialNumber'] || '',
          location: params['location'] || '',
          requestedBy: '',
          notes: ''
        };
        // Open the modal to show the new request
        this.showRequestModal = true;
      }
    });
  }

  get filteredRequests(): Request[] {
    return this.requests.filter(request => {
      const matchesSearch = !this.searchTerm || 
        request.equipmentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.requestedBy.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.serialNumber.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || request.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  getPendingRequestsCount(): number {
    return this.requests.filter(request => request.status === 'Pending').length;
  }

  getApprovedRequestsCount(): number {
    return this.requests.filter(request => request.status === 'Approved').length;
  }

  getRejectedRequestsCount(): number {
    return this.requests.filter(request => request.status === 'Rejected').length;
  }

  trackById(_: number, request: Request): number {
    return request.id;
  }

  openAddRequestModal(): void {
    this.editingRequest = null;
    this.requestForm = {
      equipmentName: '',
      category: '',
      serialNumber: '',
      location: '',
      requestedBy: '',
      notes: ''
    };
    this.showRequestModal = true;
  }

  editRequest(request: Request): void {
    this.editingRequest = request;
    this.requestForm = {
      equipmentName: request.equipmentName,
      category: request.category,
      serialNumber: request.serialNumber,
      location: request.location,
      requestedBy: request.requestedBy,
      notes: request.notes || ''
    };
    this.showRequestModal = true;
  }

  deleteRequest(request: Request): void {
    if (confirm(`Are you sure you want to delete this request from ${request.requestedBy}?`)) {
      this.requests = this.requests.filter(r => r.id !== request.id);
    }
  }

  closeRequestModal(): void {
    this.showRequestModal = false;
    this.editingRequest = null;
    this.requestForm = {
      equipmentName: '',
      category: '',
      serialNumber: '',
      location: '',
      requestedBy: '',
      notes: ''
    };
  }

  saveRequest(): void {
    if (!this.requestForm.equipmentName || !this.requestForm.requestedBy) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.editingRequest) {
      // Update existing request
      const index = this.requests.findIndex(r => r.id === this.editingRequest!.id);
      if (index !== -1) {
        this.requests[index] = {
          ...this.requests[index],
          equipmentName: this.requestForm.equipmentName,
          category: this.requestForm.category,
          serialNumber: this.requestForm.serialNumber,
          location: this.requestForm.location,
          requestedBy: this.requestForm.requestedBy,
          notes: this.requestForm.notes
        };
      }
    } else {
      // Add new request
      const newRequest: Request = {
        id: Math.max(...this.requests.map(r => r.id)) + 1,
        equipmentName: this.requestForm.equipmentName,
        category: this.requestForm.category,
        serialNumber: this.requestForm.serialNumber,
        location: this.requestForm.location,
        requestedBy: this.requestForm.requestedBy,
        requestDate: new Date(),
        status: 'Pending',
        notes: this.requestForm.notes
      };
      this.requests.push(newRequest);
    }

    this.closeRequestModal();
  }

  approveRequest(request: Request): void {
    const index = this.requests.findIndex(r => r.id === request.id);
    if (index !== -1) {
      this.requests[index] = { ...this.requests[index], status: 'Approved' };
    }
  }

  rejectRequest(request: Request): void {
    const index = this.requests.findIndex(r => r.id === request.id);
    if (index !== -1) {
      this.requests[index] = { ...this.requests[index], status: 'Rejected' };
    }
  }
}
