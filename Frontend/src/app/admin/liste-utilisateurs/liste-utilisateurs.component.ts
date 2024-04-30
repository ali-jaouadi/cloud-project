import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.scss']
})
export class ListeUtilisateursComponent implements OnInit {

  constructor(private auth:AuthentificationService) { }
  utilisateurs:any=[]
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.utilisateurs=[]
    this.auth.getUsers().subscribe(res=>{
      this.utilisateurs=res
    })
  }
  // activerCompte(id:string){
  //   this.auth.activerCompte(id).subscribe(res=>{
  //     console.log(res);
  //     this.getAllUsers()
  //   })
  // }
  // desactiverCompte(id:string){
  //   this.auth.desactiverCompte(id).subscribe(res=>{
  //     console.log(res);
  //     this.getAllUsers()
  //   })
  // }
  change(event:any,id:string){
    console.log(event.target.checked);
    if (event.target.checked) {
      this.auth.activerCompte(id).subscribe(res=>{
        this.getAllUsers()
      })
    }else{
      this.auth.desactiverCompte(id).subscribe(res=>{
        console.log(res);
        this.getAllUsers()
      })
    }
  }

}
