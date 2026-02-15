import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appbar',
  standalone: false,
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {
   @Input() username: string = 'roayaaa'; // pass the username from dashboard
  @Input() role: string = 'Admin';

  logout() {
    alert('Logging out...'); 
    
  }
}
