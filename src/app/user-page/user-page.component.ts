import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Concours } from '../concours';
import { Question } from '../question';
import { Reponse } from '../reponse';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  rep= new Reponse();
  activateForm:boolean=true;
  activateAlert1:boolean=false;
  navbarOpen = false;
  activateAlert2:boolean=false;
  concours=new Concours();
  Aujourdhui = new Date();
  dateD!:string;
  dateF!:string;
  logo!:boolean;
  image:any;
  url!:string;
  email!:string;
  ins!:number;
  DateDebut=new Date(this.dateD);
  i!:number;
  r: String[] = [];
  DateFin !:Date;
  id!:number;
  constructor(private router:Router, private clientService:ClientService,private actroute:ActivatedRoute) { }
  q: Question[] = [];
  ngOnInit(): void {
    this.clientService.getUserBymail(sessionStorage.getItem('email')).subscribe(data => {
      this.ins=data.inscrir;
      this.id=data.id;
      this.email=data.email;
    });
    this.clientService.getConcours().subscribe(data => {
      this.concours= data[0];
      this.dateD=this.concours.date_debut;
      this.dateF=this.concours.date_fin;
      this.DateDebut = new Date(this.dateD);
      this.DateFin = new Date(this.dateF);
      if(this.Aujourdhui.getTime()<this.DateDebut.getTime()){
        this.activateAlert1=true;
        this.activateForm=false;
      }else if(this.Aujourdhui.getTime()>this.DateFin.getTime()){
        this.activateAlert2=true;
        this.activateForm=false;
      }else if(this.ins==1){
        this.router.navigate(['/ModifierPage',this.id]);
        } 
      else{
        
        this.clientService.getlogo().subscribe( response =>{
          this.image= response;
          this.logo=true
      });  
      this.getConcours(); 
      }
     });

  }
  onselectFile(e:any){
    if(e.target.files){
          var reader =new FileReader();
          this.clientService.selectedCv=e.target.files[0];
          reader.readAsDataURL(e.target.files[0]);
          reader.onload=(event:any)=>{
            this.url=event.target.result;
          }
    }

  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/Login']); 
  }
  private getConcours(){
    this.clientService.getQuestion().subscribe(data => {
      this.q= data;});
}
Inscription(){
  const uploadImageData = new FormData();
  uploadImageData.append('cv', this.clientService.selectedCv, this.clientService.selectedCv.name);
  uploadImageData.append('reponses',JSON.stringify(this.rep.reponses));
  uploadImageData.append('email',this.email);
  this.clientService.Inscription(uploadImageData).subscribe(data =>{
    this.router.navigate(['/ModifierPage',this.id]); 
  },
  error =>console.log(error));
}
toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}
}