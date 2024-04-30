import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {

  constructor(private http:HttpClient,private auth:AuthentificationService) {}
  joueurs=0
  proprietaire=0
  stades=0
  reservation=0
  ngOnInit(): void {
    this.getAllUsers()
    this.http.get('http://localhost:3000/stade/count').subscribe((res: any) => {
      this.stades=res
    })
    this.http.get('http://localhost:3000/reservation/count').subscribe((res: any) => {
      this.reservation=res
    })
  }
  getAllUsers(){
    this.auth.getUsers().subscribe((res:any)=>{
      res.forEach((element:any) => {
        if(element.role=="joueur")this.joueurs++
        if(element.role=="proprietaire")this.proprietaire++
      });
    })
  }
}
