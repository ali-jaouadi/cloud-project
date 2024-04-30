import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  playerLoginForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,private auth:AuthentificationService, private router: Router,public toastr: ToastrService) { }
  erreur = ""
  submitted = false
  ngOnInit(): void {
    this.playerLoginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  showSuccess(message:string){
    this.toastr.success(message, 'Login Success', {
   timeOut: 3000,
    });
   }
  showError(message:string){
    this.toastr.error(message, 'Login Erreur !', {
   timeOut: 3000,
    });
   }
  submit() {
    this.submitted = true;
    if (this.playerLoginForm.valid) {
      console.log(this.playerLoginForm.value);
      this.erreur = ""
      this.auth.login(this.playerLoginForm.value).subscribe((resp: any) => {
        sessionStorage.setItem("token", resp.token)
        let user:any=jwtDecode(resp.token)
        this.showSuccess(user.prenom)
        this.auth.loggedIn.next(true)
        if(user.role=="proprietaire") {this.auth.role.next("proprietaire"); this.router.navigateByUrl('/proprietaire')}
        if(user.role=="admin"){this.router.navigateByUrl('/admin');this.auth.role.next("admin")}
        if(user.role=="joueur") {this.router.navigateByUrl('/stades');this.auth.role.next("joueur")}
      }, err => {
        this.showError(err.error)
        this.erreur = err.error
      })
    }
    
  }
}
