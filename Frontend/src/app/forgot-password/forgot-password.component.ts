import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  EmailForm!: FormGroup;
  error = ""
  submitted = false
  constructor(private formbuilder: FormBuilder,public toastr: ToastrService, private router: Router, private auth: AuthentificationService) { }

  ngOnInit(): void {
    this.EmailForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
  showSuccess(message:string){
    this.toastr.success(message, '', {
   timeOut: 5000,
    });
   }
  showError(message:string){
    this.toastr.error(message, 'Erreur !', {
   timeOut: 3000,
    });
   }
  submit(){
    this.submitted = true;
    this.error=""
    // stop here if form is invalid
    if (this.EmailForm.valid) {
      this.auth.forgotPassword(this.EmailForm.value.email).subscribe((res:any)=>{
        this.showSuccess(res)
        this.router.navigateByUrl('/login')
      },
      err=>{
        this.error=err.error
        this.showError(err.error)
      })
    }
  }
}
