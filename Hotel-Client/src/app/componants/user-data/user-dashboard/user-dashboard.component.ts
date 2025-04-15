import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { RoomsdisplayComponent } from "../../customers/roomsdisplay/roomsdisplay.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{

  constructor(private tokenservice:TokenService){}
  ngOnInit(): void {
  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
  }
  logout(){
    this.tokenservice.logout();

  }
}
