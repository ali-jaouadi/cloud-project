import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-proprietaire-dashboard',
  templateUrl: './proprietaire-dashboard.component.html',
  styleUrls: ['./proprietaire-dashboard.component.scss']
})
export class ProprietaireDashboardComponent implements OnInit {

  constructor(private http:HttpClient,private data:DataService) { }

  reservations=0
  montant=0
  ngOnInit(): void {
    this.data.getAllReservations().subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.montant=this.montant+element.montant
      });
      this.reservations=res.length
    })
  }
}
