import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  baseUrl="http://localhost:3000/"
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  role:BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor(private http:HttpClient,private router:Router) {
        if(sessionStorage.getItem('token')!=null){
        this.loggedIn.next(true);
        let user:any=jwtDecode(sessionStorage.getItem('token')||"")
        this.role.next(user.role);
      }
  }
  logout(){
    this.loggedIn.next(false)
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    this.http.post(this.baseUrl+"auth/logout",{},{headers:headers}).subscribe(()=>{      
      this.router.navigateByUrl("/login")
      sessionStorage.clear()
    },()=>{
      this.router.navigateByUrl("/login")
      sessionStorage.clear()
    })
  }
  login(f:any){
    return this.http.post(this.baseUrl+"auth/login",f)
  }
  register(f:any){
    return this.http.post(this.baseUrl+"auth/register",f)
  }
  findEmail(email:String){
    return this.http.post(this.baseUrl+"auth/email",{email:email})
  }
  forgotPassword(email:String){
    return this.http.post(this.baseUrl+"auth/forgot-password",{email:email})
  }
  resetPassword(password:String){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('reset-token')})
    return this.http.post(this.baseUrl+"auth/reset-password",{password:password},{headers:headers})
  }
  getUserData(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get(this.baseUrl+"auth/profile",{headers:headers})
  }
  getUsers(){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.get(this.baseUrl+"auth/all",{headers:headers})
  }
  activerCompte(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post(this.baseUrl+"auth/activer",{userId:id},{headers:headers})
  }
  desactiverCompte(id:string){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.post(this.baseUrl+"auth/desactiver",{userId:id},{headers:headers})
  }
  changeImage(image:any){
    
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put("http://localhost:3000/auth/image",image,{headers:headers})
  }
  changePassword(f:any){
    const headers =new HttpHeaders({'Authorization': 'Bearer '+sessionStorage.getItem('token')})
    return this.http.put("http://localhost:3000/auth/password",f,{headers:headers})
  }
}
