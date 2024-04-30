import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl="http://localhost:3000/"
  // headers =new HttpHeaders({'Authorization': ''+sessionStorage.getItem('token')})
  // headers ={'Authorization': 'Bearer '+"gggg"}
  constructor(private http:HttpClient) {
    
  }
  getAllStades(filter:any){
    return this.http.get(this.baseUrl+"stade/all"+filter)
  }
  addStade(f:any){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post(this.baseUrl+"stade/add",f,{headers:headers})
  }
  modifierStade(f:any){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put(this.baseUrl+"stade/update/"+f.id,f,{headers:headers})
  }
  getProprietaireStade(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get(this.baseUrl+"stade/proprietaire",{headers:headers})
  }
  getStadeById(id:string){
    return this.http.get(this.baseUrl+"stade/id/"+id)
  }
  getStadesDemande(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get(this.baseUrl+"stade/demande",{headers:headers})
  }
  accepterDemandeStade(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put(this.baseUrl+"stade/accepter/"+id,{},{headers:headers})
  }
  refuserDemandeStade(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put(this.baseUrl+"stade/refuser/"+id,{},{headers:headers})
  }
  activerStade(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put(this.baseUrl+"stade/activer/"+id,{},{headers:headers})
  }
  desactiverStade(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put(this.baseUrl+"stade/desactiver/"+id,{},{headers:headers})
  }

  getAllReservations(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get(this.baseUrl+"reservation/all",{headers:headers})
  }
  getReservationsByDate(date:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get(this.baseUrl+"reservation/date/"+date,{headers:headers})
  }

  reserverStade(form:any){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post(this.baseUrl+"reservation/reserver",form,{headers:headers})
  }
}
