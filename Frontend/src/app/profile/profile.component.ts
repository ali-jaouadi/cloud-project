import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private http:HttpClient,public toastr: ToastrService,private auth:AuthentificationService,private formbuilder: FormBuilder) {
  }
  changeForm!: FormGroup;
  image:any
  user:any
  submitted=false
  ngOnInit(): void {
    this.changeForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.auth.getUserData().subscribe(res=>{
      this.user=res
      })
  }

  showSuccess(message:string){
    this.toastr.success(message, 'Modification Success', {
   timeOut: 3000,
    });
   }
  showError(message:string){
    this.toastr.error(message, 'Erreur de modification !', {
   timeOut: 3000,
    });
   }


  change(e:any){
    this.image=e.target.files[0]
  }
  save(){
    const formData = new FormData();
    formData.append('image',this.image);
    this.auth.changeImage(formData).subscribe(res=>{
      this.showSuccess("votre image a etait changer")
      this.user.image=res
    })
  }
  updatePassword(){
    this.submitted=true
    if (this.changeForm.valid) {
      
    
    this.auth.changePassword(this.changeForm.value).subscribe(res=>{
      this.submitted=false
      this.changeForm.reset()
      this.showSuccess("votre mot de passe a etait changer")
    },err=>{
      this.showError(err.error)
    })
  }
  }
}
