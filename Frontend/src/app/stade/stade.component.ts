import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-stade',
  templateUrl: './stade.component.html',
  styleUrls: ['./stade.component.scss']
})
export class StadeComponent implements OnInit {

  url = "https://maps.google.com/maps?q=33.362876,%2010.467702&t=&z=13&ie=UTF8&iwloc=&output=embed"
  stadeId: string = ""
  stade: any
  ReservationForm!: FormGroup;
  isAuth = false
  submitted = false
  telephone = ""
  constructor(private formbuilder: FormBuilder, private data: DataService, private route: ActivatedRoute,
    private http: HttpClient, private auth: AuthentificationService, public toastr: ToastrService) {

    this.auth.loggedIn.subscribe(res => {
      this.isAuth = res
    })
    this.route.paramMap.subscribe(params => {
      this.stadeId = params.get('id') || ""
    })
    this.http.get("http://localhost:3000/stade/id/" + this.stadeId).subscribe((res: any) => {
      this.stade = res
      this.http.get("http://localhost:3000/auth/" + res.proprietaire).subscribe((res1:any) => {
        this.telephone=res1.phone
      })
    })
  }
  date = new Date(Date.now())
  ngOnInit(): void {
    this.ReservationForm = this.formbuilder.group({
      stadeId: [this.stadeId],
      date: ['', [Validators.required,]],
      equipe: [16, [Validators.required]],
    })
    // console.log(this.date.toISOString().slice(0,16));
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
  reserver() {
    this.submitted = true
    console.log(this.ReservationForm.value);
    if (this.ReservationForm.valid) {
      this.data.reserverStade(this.ReservationForm.value).subscribe((res: any) => {
        this.showSuccess(res)
      }, err => {
        this.showError(err.error)
      }
      )
    } else {
      this.showError("Veillez remplir tous les champs")
      this.submitted = true
    }
  }
}
