import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm!: FormGroup;
  error = ""
  submitted = false
  constructor(private formbuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private auth: AuthentificationService) {
    this.route.paramMap.subscribe(params => {
      sessionStorage.setItem('reset-token',params.get('token')||"")
    })
  }

  ngOnInit(): void {
    this.ResetPasswordForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
    })

  }
  submit(){
    this.submitted = true;
    this.error=""
    // stop here if form is invalid
    if (this.ResetPasswordForm.valid&&this.ResetPasswordForm.value.password===this.ResetPasswordForm.value.confirm) {
      this.auth.resetPassword(this.ResetPasswordForm.value.password).subscribe(res=>{
        this.router.navigateByUrl('/login')
      },
      err=>{
        console.log(err.error.message);
      })
      
    }else this.error="wrong confirm Password"
  }
}
