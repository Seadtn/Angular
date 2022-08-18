import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Concours } from '../concours';
import { Question } from '../question';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  opened:boolean=true;
  creeconcours:boolean=true;
  consulter:boolean=false;
  concours=new Concours();
  questions: Array<Question>=[];
  conc: Concours[] = [];
  liste!: number;
  dateMin!:string;
  formdata!:FormData;
  nbrQuestion!:number;
  alert:boolean=false;
  alert1:boolean=false;
  form1:boolean=true;
  form2:boolean=false;
  btn:boolean=true;
  navbarOpen = false;
  constructor( private router:Router, private clientService:ClientService) { } 
  ngOnInit() {
    if(localStorage.getItem('role')=='USER'){
      this.router.navigate(['/UserPage']);
    }
    this.getConcours();
  }
  url="";
  sidebaritems(){
    this.opened=!this.opened;
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/Login']); 
  }
  crConcous(){
    this.creeconcours=false;
    this.consulter=true;
  }
  cCRconcours(){
    this.creeconcours=true;
    this.consulter=false;
  }
   precedent(){
    this.form1=true;
    this.form2=false;
  }
  SendDateDebut(event: any) {
    this.dateMin=event.target.value;
    console.log(event.target.value);
    }
    SendDateFin(event: any) {
        console.log(event.target.value);
      }
  onselectFile(e:any){
    if(e.target.files){
          var reader =new FileReader();
          this.clientService.selectedFile=e.target.files[0];
          reader.readAsDataURL(e.target.files[0]);
          reader.onload=(event:any)=>{
            this.url=event.target.result;
          }
    }

  }
  valider1(){
    if(this.liste==0){
    const uploadImageData = new FormData();
    uploadImageData.append('logo', this.clientService.selectedFile, this.clientService.selectedFile.name);
    uploadImageData.append('concours',JSON.stringify(this.concours));
    this.clientService.CreateConcours(uploadImageData).subscribe(data =>{
      this.nbrQuestion=data.nbrQuestion;
      this.form1=false;
      this.form2=true;
      this.alert=false;
    },
    error =>console.log(error));
    }else{
      this.alert=true;
    }

  }
  private getConcours(){
      this.clientService.getConcours().subscribe(data => {
        this.conc= data;
        this.liste=data.length;});
  

}
closeAlert(){
  this.alert=false;
  this.alert1=false;
  window.location.reload();
}
valider2(){
    this.clientService.DeleteAllRows().subscribe(data => {
      },error =>console.log(error));
    for(let q in this.questions){
      const ques = new FormData();
      ques.append('question',JSON.stringify(this.questions[q]));
      console.log(this.questions[q]);
    this.clientService.addQuestion(ques).subscribe(data =>{
    },
    error =>console.log(error));
    }
    window.location.reload();
    this.alert1=true;
  }
  DeleteCr(){
    this.clientService.DeleteCr().subscribe(data => {
    },error =>console.log(error));
    window.location.reload();
}
toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}
}