import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {
  demandes:any=[]
  constructor(private data:DataService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getStadesDemande()
  }
  getStadesDemande(){
    this.demandes=[]
    this.data.getStadesDemande().subscribe((resp:any)=>{
      resp.forEach((element:any) => {
        if(element.verifier==false){
          this.demandes.push(element)
        }
      });
    },err=>{

    })
  }

  accepterDemande(id:string){
      this.data.accepterDemandeStade(id).subscribe(res=>{
        this.getStadesDemande()
      })
  }
  refuserDemande(id:string){
      this.data.refuserDemandeStade(id).subscribe(res=>{
        this.getStadesDemande()
      })
  }
}
