import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-stades',
  templateUrl: './stades.component.html',
  styleUrls: ['./stades.component.scss']
})
export class StadesComponent implements OnInit {


  visible = false
  loading = true
  rechercheListe: any = []
  stadesListe: any = []
  activatePage = 1
  ville = ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
    "Kairouan", "Kasserine", "Kebili", "Manouba", "Kef", "Mahdia", "Médenine", "Monastir",
    "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"]
  pages: Array<Number> = []
  // pages:Array<Number>=[1,2,3,4,5,6,7,8,9,10,11,12]
  orderBy = ""
  filter = {}
  reclamationForm!: FormGroup;
  submitted = false;
  constructor(private formbuilder: FormBuilder, private route: ActivatedRoute, private data: DataService, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params['page'] != null) {
        this.activatePage = Number(params['page'])
        if (this.activatePage == 0) {
          this.activatePage = 1
        }
      }
      this.filter = params
      console.log(this.filter);
      this.pages = []
      this.http.get('http://localhost:3000/stade/count').subscribe((res: any) => {
        if (res < 12) this.pages.push(1)
        else {
          for (let i = 0; i < res / 12; i++) {
            this.pages.push(i + 1)
          }
        }
      })
      this.getAllStadiums()
    })
    /*      if(this.activatePage>this.pages){
            console.log(this.pages)
            this.route.navigateByUrl('/home/2')
          }*/

  }

  ngOnInit(): void {
    this.reclamationForm = this.formbuilder.group({
      Sujet: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
    //this.getAllStadiums()
  }
  input(e: any) {
    this.rechercheListe = []
    this.http.get('http://localhost:3000/stade/nom/' + e.target.value).subscribe((resp: any) => {
      this.visible = true
      this.rechercheListe = resp
    })
  }
  getAllStadiums() {
    this.loading = true
    this.stadesListe = []
    this.http.get('http://localhost:3000/stade/all', { params: this.filter }).subscribe(resp => {
      console.log("liste stade", resp);
      this.stadesListe = resp
      setTimeout(() => {
        this.loading = false
      }, 2000);
    }, err => {
      this.loading = false
    })
  }
  submit() {
    this.submitted = true;
    if (this.reclamationForm.valid) {
      this.http.post('http://localhost:3000/auth/reclamation', this.reclamationForm.value).subscribe(resp => {

      }, err => {

      })
    }
  }
}
