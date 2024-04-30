import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proprietaire-reservations',
  templateUrl: './proprietaire-reservations.component.html',
  styleUrls: ['./proprietaire-reservations.component.scss']
})
export class ProprietaireReservationsComponent implements OnInit {

  hours=["8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
  weekDays=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
  reservation:any[]=[]
  today=new Date
  days:Date[]=[]
  ReservationForm!: FormGroup;
  constructor(private http:HttpClient,private formbuilder: FormBuilder,public toastr: ToastrService,private data:DataService) { 
      this.today=new Date(Date.now())      
      for (let i = 0; i < 7; i++) {
        this.days[i]=new Date()
        this.days[i].setDate(this.today.getDate()+i)
      }
    
  }
  
  stades:any=[]
  getStades(){
    this.stades=[]
    this.data.getProprietaireStade().subscribe(res=>{
      this.stades=res
    })
  }

  ngOnInit(): void {
    this.getStades()
    this.getAllReservations()

    this.ReservationForm = this.formbuilder.group({
      stadeId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      equipe: [16, [Validators.required]],
    })
    
  }
  getAllReservations(){
    this.reservation=[]
    this.data.getAllReservations().subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.http.get("http://localhost:3000/auth/name/"+element.joueurId).subscribe((resp:any)=>{
          element.joueur= resp
          element.date=new Date(element.date)
          element.date.setHours(element.date.getHours()-1)
          this.reservation.push(element)
        })

      });
      console.log(this.reservation);
    })
  }
  getPosition(a:any){
    let x=0;
    this.reservation.forEach(res => {
      if(res.date.toLocaleDateString()==a.date.toLocaleDateString()){
        if(res.date<a.date){
          x=x-90
        }
      }
    });
    return (x+a.date.getHours()*60+a.date.getMinutes())-480
  }
  back(){
    this.reservation=[]
    this.today.setDate(this.today.getDate()-7)
    let p=this.today.toLocaleDateString().split('/')
    let date=p[2]+'-'+p[1]+'-'+p[0]
    this.data.getReservationsByDate(date).subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.http.get("http://localhost:3000/auth/name/"+element.joueurId).subscribe((resp:any)=>{
          element.joueur= resp
          element.date=new Date(element.date)
          element.date.setHours(element.date.getHours()-1)
          this.reservation.push(element)
        })

      });
    })
    let d=new Date(this.today)
    this.days=[]
    for (let i = 0; i < 7; i++) {
      this.days[i]=new Date(d)
      d.setDate(d.getDate()+1)
    }
  }
  next(){
    this.reservation=[]
    this.today.setDate(this.today.getDate()+7)
    let p=this.today.toLocaleDateString().split('/')
    let date=p[2]+'-'+p[1]+'-'+p[0]
    this.data.getReservationsByDate(date).subscribe((res:any)=>{
      res.forEach((element:any) => {
        this.http.get("http://localhost:3000/auth/name/"+element.joueurId).subscribe((resp:any)=>{
          element.joueur= resp
          element.date=new Date(element.date)
          element.date.setHours(element.date.getHours()-1)
          this.reservation.push(element)
        })
      });
    })
    let d=new Date(this.today)
    this.days=[]
    for (let i = 0; i < 7; i++) {
      this.days[i]=new Date(d)
      d.setDate(d.getDate()+1)
    }
  }




  showSuccess(message: string) {
    this.toastr.success(message, 'Reservation Ajouter', {
      timeOut: 3000,
    });
  }
  showError(message: string) {
    this.toastr.error(message, 'Reservation Erreur !', {
      timeOut: 3000,
    });
  }



  submitted=false
  reserver() {
    this.submitted = true
    console.log(this.ReservationForm.value);
    if (this.ReservationForm.valid) {
      this.data.reserverStade(this.ReservationForm.value).subscribe((res: any) => {
        this.showSuccess(res)
      }, err => {
        this.showError(err.error)
      })
    }
  }
}