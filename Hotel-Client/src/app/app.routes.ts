import { Routes } from '@angular/router';
import { LoginSignupComponent } from './componants/login-signup/login-signup.component';
import { HomeComponent } from './componants/home/home.component';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './componants/admin/admin.component';
import { AdminAddHotelComponent } from './componants/admin-data/admin-add-hotel/admin-add-hotel.component';
import { AdminDashboardComponent } from './componants/admin-data/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './componants/user-data/user-dashboard/user-dashboard.component';
import { AddHotelComponent } from './componants/user-data/add-hotel/add-hotel.component';
import { RoomComponent } from './componants/user-data/room/room.component';
import { HotelInformationComponent } from './componants/user-data/hotel-information/hotel-information.component';
import { UpdateRoomComponent } from './componants/user-data/update-room/update-room.component';
import { RoomsdisplayComponent } from './componants/customers/roomsdisplay/roomsdisplay.component';
import { AddimagesComponent } from './componants/user-data/addimages/addimages.component';
import { HotelDetailsDialogComponent } from './componants/HomePage/hotel-details-dialog/hotel-details-dialog.component';
import { DisplayHotelsComponent } from './componants/HomePage/display-hotels/display-hotels.component';

export const routes: Routes = [
    { path: '',redirectTo: 'home', pathMatch: 'full' }, // Show HomeComponent first
    { path: 'login', component: LoginSignupComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard], children: [
        { path: '', component: DisplayHotelsComponent },
        { path: 'room/:id', component: RoomComponent }
    ]},
    { 
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [authGuard],
        children: [
            { path: '', component: AdminDashboardComponent } // Default child route
        ]
    },
    {
        path: 'user',
        component: UserDashboardComponent,
        canActivate: [authGuard],
        children: [
           { path: 'addhotel', component: AddHotelComponent },
           { path: 'addroom/:hotelId', component: RoomComponent },
           { path: 'hotelinformation', component: HotelInformationComponent },
           { path: 'updateroom/:id', component: UpdateRoomComponent },
           { path: '', component: RoomsdisplayComponent },
           { path: 'addphotos/:id', component: AddimagesComponent }
        ]
    },
    { path: '**', redirectTo: '' } // Redirect unknown routes to Home
];