import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../models/Hotel';
import { AdminHotelService } from '../../../services/admin/admin-hotel.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-add-hotel',
  imports: [FormsModule],
  templateUrl: './admin-add-hotel.component.html',
  styleUrl: './admin-add-hotel.component.css'
})
export class AdminAddHotelComponent implements OnInit{


  hotel: Hotel = new Hotel();
  constructor(private hotelservice:AdminHotelService){}
  ngOnInit(): void {
    
  }
  addHotel(){
    this.hotelservice.addhotel(this.hotel).subscribe((res:any)=>{
      console.log(res);
      this.hotel=new Hotel();
    },error=>{
      console.log(error);
    })
  }




}
