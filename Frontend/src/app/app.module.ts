import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StadesComponent } from './stades/stades.component';
import { StadeComponent } from './stade/stade.component';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { ProprietaireDashboardComponent } from './proprietaire/proprietaire-dashboard/proprietaire-dashboard.component';
import { ProprietaireReservationsComponent } from './proprietaire/proprietaire-reservations/proprietaire-reservations.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ListeUtilisateursComponent } from './admin/liste-utilisateurs/liste-utilisateurs.component';
import { ProfileComponent } from './profile/profile.component';
import { StadesMapComponent } from './stades-map/stades-map.component';
import { ProprietaireStadesComponent } from './proprietaire/proprietaire-stades/proprietaire-stades.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgChartsModule } from 'ng2-charts';
import { ProprietaireRegisterComponent } from './proprietaire-register/proprietaire-register.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DemandeComponent } from './admin/demande/demande.component';
import { StadeMapComponent } from './stade-map/stade-map.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoginComponent,
    RegisterComponent,
    StadesComponent,
    StadeComponent,
    ProprietaireComponent,
    ProprietaireDashboardComponent,
    ProprietaireReservationsComponent,
    AdminComponent,
    AdminDashboardComponent,
    ListeUtilisateursComponent,
    ProfileComponent,
    StadesMapComponent,
    ProprietaireStadesComponent,
    ProprietaireRegisterComponent,
    ReservationsComponent,
    DemandeComponent,
    StadeMapComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSlideToggleModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
