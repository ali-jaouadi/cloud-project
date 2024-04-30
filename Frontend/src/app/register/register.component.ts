import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  playerSignUpForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private auth: AuthentificationService, public toastr: ToastrService) { }
  error = ""
  emailError = ""
  passwordError = ""
  submitted = false
  verif = false
  ngOnInit(): void {
    this.playerSignUpForm = this.formbuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  showSuccess(message: string) {
    this.toastr.success(message, 'Registration Success', {
      timeOut: 3000,
    });
  }
  showError(message: string) {
    this.toastr.error(message, 'Registration Erreur !', {
      timeOut: 3000,
    });
  }
  submit() {
    this.submitted = true;
    this.passwordError = ""
    this.error = ""
    if (this.playerSignUpForm.value.password != this.playerSignUpForm.value.confirmPassword) this.passwordError = "Wrong Confirm Password"
    if (this.playerSignUpForm.value.password === this.playerSignUpForm.value.confirmPassword &&/*this.verif*/true && this.submitted && this.playerSignUpForm.valid) {
      console.log(this.playerSignUpForm.value);
      this.auth.register(this.playerSignUpForm.value).subscribe((resp: any) => {
        this.showSuccess(resp)
        this.error = "check your email"
        this.router.navigateByUrl('/login')
      }, err => {
        this.showError(err.error)
        this.error = err.error
      })
    }
  }
  findEmail() {
    this.emailError = ""
    if (this.playerSignUpForm.value.email != "") {
      this.auth.findEmail(this.playerSignUpForm.value.email).subscribe((resp: any) => {
        console.log(resp)
        if (resp.message == false) {
          this.emailError = ""
          this.verif = true
        } else {
          this.verif = false
          this.emailError = "Email Deja existe"
        }
      })
    }
  }
}
