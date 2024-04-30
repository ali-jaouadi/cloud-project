import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { DemandeComponent } from './admin/demande/demande.component';
import { ListeUtilisateursComponent } from './admin/liste-utilisateurs/liste-utilisateurs.component';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { ProprietaireAuthGuard } from './guards/proprietaire-auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProprietaireRegisterComponent } from './proprietaire-register/proprietaire-register.component';
import { ProprietaireDashboardComponent } from './proprietaire/proprietaire-dashboard/proprietaire-dashboard.component';
import { ProprietaireReservationsComponent } from './proprietaire/proprietaire-reservations/proprietaire-reservations.component';
import { ProprietaireStadesComponent } from './proprietaire/proprietaire-stades/proprietaire-stades.component';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StadeMapComponent } from './stade-map/stade-map.component';
import { StadeComponent } from './stade/stade.component';
import { StadesMapComponent } from './stades-map/stades-map.component';
import { StadesComponent } from './stades/stades.component';

const routes: Routes = [
  {path:"",redirectTo:'stades',pathMatch:'full'},
  {path:"register",component:RegisterComponent},
  {path:"proprietaire/register",component:ProprietaireRegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"reset-password/:token",component:ResetPasswordComponent},
  {path:"stades",component:StadesComponent},
  {path:"stade/:id",component:StadeComponent},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
  {path:"maps",component:StadesMapComponent},
  {path:"map/:id",component:StadeMapComponent},
  {path:"admin",component:AdminComponent,canActivate:[AdminAuthGuard],children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:"dashboard" ,component:AdminDashboardComponent},
    {path:"utilisateurs" ,component:ListeUtilisateursComponent},
    {path:"profile",component:ProfileComponent},
    {path:"demandes",component:DemandeComponent},
    {path:'**',redirectTo:'dashboard',pathMatch:'full'},
  ]},
  {path:"proprietaire",component:ProprietaireComponent,canActivate:[ProprietaireAuthGuard],children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:"dashboard" ,component:ProprietaireDashboardComponent},
    {path:"reservations" ,component:ProprietaireReservationsComponent},
    {path:"stades" ,component:ProprietaireStadesComponent},
    {path:"profile",component:ProfileComponent},
    {path:'**',redirectTo:'dashboard',pathMatch:'full'},
  ]},
  {path:'**',redirectTo:'stades',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
