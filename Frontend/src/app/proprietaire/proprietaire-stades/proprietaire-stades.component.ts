import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proprietaire-stades',
  templateUrl: './proprietaire-stades.component.html',
  styleUrls: ['./proprietaire-stades.component.scss']
})
export class ProprietaireStadesComponent implements OnInit {
  StadeForm!: FormGroup;
  StadeUpdateForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,private data:DataService,private http:HttpClient) { }
  rating=3.5
  loading=true
  position=""
  stades:any=[]
  images:any=[]
  ville=["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kebili", "Manouba", "Kef", "Mahdia", "Médenine", "Monastir",
  "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"]
  ngOnInit(): void {
    this.StadeForm = this.formbuilder.group({
      nom: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      rue: ['', [Validators.required]],
      coordonnes: ['', [Validators.required]],
      capacite: ['', [Validators.required]],
      Tarif: ['', [Validators.required]],
    })
    this.StadeUpdateForm = this.formbuilder.group({
      id: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      rue: ['', [Validators.required]],
      coordonnes: ['', [Validators.required]],
      capacite: ['', [Validators.required]],
      Tarif: ['', [Validators.required]],
    })

    this.data.getProprietaireStade().subscribe(res=>{
      this.stades=res
      console.log(res);
      setTimeout(() => {
        this.loading = false
      }, 2000);
    })

  }

getStades(){
  this.stades=[]
  this.data.getProprietaireStade().subscribe(res=>{
    this.stades=res
  })
}
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(res=>{
      this.position= res.coords.latitude+","+res.coords.longitude   
      }) 
    }
  }

  change(e:any){
    console.log(e.target.files);
    this.images=e.target.files
  }
  ajoutStade(){
    const formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      formData.append('image',this.images[i]);    
    }
    formData.append('nom',this.StadeForm.value.nom); 
    formData.append('ville',this.StadeForm.value.ville); 
    formData.append('rue',this.StadeForm.value.rue); 
    formData.append('coordonnes',this.StadeForm.value.coordonnes); 
    formData.append('capacite',this.StadeForm.value.capacite); 
    console.log(formData.getAll("image"));
    this.data.addStade(formData).subscribe(res=>{
    
  })
  }
  RemplirModel(stade:any){
    this.StadeUpdateForm.patchValue({id:stade._id});
    this.StadeUpdateForm.patchValue({nom:stade.nom});
    this.StadeUpdateForm.patchValue({ville:stade.adresse.ville});
    this.StadeUpdateForm.patchValue({rue:stade.adresse.rue});
    this.StadeUpdateForm.patchValue({coordonnes:stade.coordonnes.long+","+stade.coordonnes.lat});
    this.StadeUpdateForm.patchValue({capacite:stade.capacite});
  }

  UpdateStade(){
    this.data.modifierStade(this.StadeUpdateForm.value).subscribe(resp=>{
      this.getStades()
    })
  }

  activerStade(id:string){
    this.data.activerStade(id).subscribe(resp=>{
      this.getStades()
    })
  }
  desactiverStade(id:string){
    this.data.desactiverStade(id).subscribe(resp=>{
      this.getStades()
    })
  }
}
