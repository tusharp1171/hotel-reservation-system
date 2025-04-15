import { Component } from '@angular/core';
import { AdminAddHotelComponent } from "../admin-data/admin-add-hotel/admin-add-hotel.component";
import { AdminDashboardComponent } from "../admin-data/admin-dashboard/admin-dashboard.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [ RouterOutlet,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
