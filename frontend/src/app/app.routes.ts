import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/guest/login/login.component';
import { HomeComponent } from './pages/guest/home/home.component';
import { SignInComponent } from './pages/guest/sign-in/sign-in.component';
import { ProfileComponent } from './pages/guest/profile/profile.component';
import { RoomsComponent } from './pages/guest/rooms/rooms.component';
import { RestaurantComponent } from './pages/guest/restaurant/restaurant.component';
import { MeetingComponent } from './pages/guest/meeting/meeting.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { RoomsBookedComponent } from './pages/admin/rooms-booked/rooms-booked.component';
import { AdminCustomMenusComponent } from './pages/admin/admin-custom-menus/admin-custom-menus.component';

export const routes: Routes = [
    // GUEST
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signIn', component: SignInComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'rooms', component: RoomsComponent},
    { path: 'rooms/:roomType', loadComponent: () => import('./pages/guest/room-detail/room-detail.component').then(m => m.RoomDetailComponent)},
    { path: 'reservations', loadComponent: () => import('./pages/guest/reservations/reservations.component').then(m => m.ReservationsComponent)},
    { path: 'restaurant', component: RestaurantComponent},
    { path: 'meeting', component: MeetingComponent},
    { path: 'custom-menus', loadComponent: () => import('./pages/guest/custom-menus/custom-menus.component').then(m => m.CustomMenusComponent)},
    // ADMIN
    { path: 'admin-home', component: AdminHomeComponent},
    { path: 'rooms-booked', component: RoomsBookedComponent},
    { path: 'admin-custom-menus', component: AdminCustomMenusComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })

export class AppRoutingModule {}