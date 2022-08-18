import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Concours } from '../concours';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  btn1!:boolean;
  btn2!:boolean;
  btn3!:boolean;
  btn4!:boolean;
  logo!:boolean;
  image:any;
  concours=new Concours();
  type!:string;
  url!:string;
  nomOr!:string;
  organisme!:string;
  dateFin!:string;
  dateDebut!:string;
  navbarOpen = false;
  constructor( private router:Router, private clientService:ClientService) { }
  ngOnInit(): void {
    if(sessionStorage.getItem('email')){
      this.btn1=false;
      this.btn2=false;
      this.clientService.getlogo().subscribe( response =>{
          this.image= response;
          this.logo=true
      });
      if(localStorage.getItem('role')=="USER"){
        this.btn3=true;
      }else{
        this.btn4=true;
      }
    }else{
      this.btn1=true;
      this.btn2=true;
      this.btn3=false;
      this.btn4=false;
    }
    this.clientService.getConcours().subscribe(data=>{
          this.concours=data[0];
         this.dateDebut=this.concours.date_debut;
         this.dateFin=this.concours.date_fin;
         this.type=this.concours.type;
         this.nomOr=this.concours.organisme;
         this.organisme=this.concours.abr;
         this.url=this.concours.url;
  });
 
}
toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}
}