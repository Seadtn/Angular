import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Concours } from '../concours';
import { Reponse } from '../reponse';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
image!:string;
id!:number;
idUser!:number;
idWrote!:number;
navbarOpen = false;
reponse=new Reponse();
concours:Concours[]=[];
  constructor(private router:Router, private clientService:ClientService ,private r:ActivatedRoute) { }

  ngOnInit(): void {
    this.clientService.getUserBymail(sessionStorage.getItem('email')).subscribe(data => {
      this.idUser=data.id
      this.idWrote= this.r.snapshot.params['id'];
      if(this.idUser!=this.idWrote){
        this.router.navigate(['/ModifierPage',this.idUser]);
        } 
        this.clientService.getlogo().subscribe( response =>{
          this.image= response;
      });
      this.clientService.getReponseByid(this.idUser).subscribe( data =>{
        this.reponse= data;
        });
        this.clientService.getConcours().subscribe( data =>{
          this.concours= data;
          });
    },error=>console.log(error));
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
  goTomodPage(){
    this.router.navigate(['modpage',this.idUser]);
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Impression du reçu</title>
          <style>
          //........Customized style.......
          </style>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        </head>
    <body onload="window.print();window.close()">
    <div class="row">
    <div class="col"><h3>République Tunisienne</h3></div>
    
    </div>
    <div class="col"><img  src="${this.image}" class="rounded mx-auto d-block"  alt="logo" height="100px"></div>
    <div class="row">
    <h3 class="text-center" >${this.concours[0].organisme}</h3>
    </div>
    <h2 class="text-center mt-5">Reçu de dépôt de candidature</h2>
    <h4 class="text-center"> N° de candidature:</h4>
    <h2 class="text-center"> <b>${this.concours[0].abr}${this.reponse.id}</b></h2>
    <p class="text-center"> ${this.concours[0].titre}</p>
    <hr style="margin-top: 1rem;
   margin-bottom: 1rem;
   border: 0;
   border-top: 1px solid 	rgb(105,105,105);">
   <h2 class="text-center mt-2">Informations personnelles</h2>
   <div class="row">  
   <div class="col"><p style="font-size: 1.2em;">Prénom:</p></div>
   <div class="col"><p style="font-size: 1.2em;">Nom:</p></div>
   <div class="col"><p style="font-size: 1.2em;">Cin:</p></div>
   </div>
   <div class="row">  
   <div class="col"><p style="font-size: 1.2em;"><b>${this.reponse.userapp.prenom}</b></p></div>
   <div class="col"><p style="font-size: 1.2em;"><b>${this.reponse.userapp.nom}</b></p></div>
   <div class="col"><p style="font-size: 1.2em;"><b>${this.reponse.userapp.cin}</b></p></div>
   </div>
   <div class="row mt-3">  
   <div class="col-5"><p style="font-size: 1.2em;">Date et lieu de naissance:</p></div>
   <div class="col"><p style="font-size: 1.2em;">Titre:</p></div>
   <div class="col"><p style="font-size: 1.2em;">Adresse email:</p></div>
   </div>
   <div class="row">  
   <div class="col-5"><p style="font-size: 1.2em;"><b>${this.reponse.userapp.date_naissance}</b> à ${this.reponse.userapp.ville}</p></div>
   <div class="col"><p style="font-size: 1.2em;"><b>${this.reponse.userapp.titre}</b></p></div>
   <div class="col"><p style="font-size: 1.2em;"><b>${this.reponse.userapp.email}</b></p></div>
   </div>
   <div class="row mt-3">  
   <div class="col-9"><p style="font-size: 1.2em;"></p></div>
   <div class="col"><p style="font-size: 1.2em;"><b>Votre signateur</b></p></div>
   </div>
   <div class="row mt">  
   <div class="col-10"><h3>Date de Depot:<p>${this.reponse.time}</p></h3></div>
   <div class="col"><p style="font-size: 1.2em;"><b>.</b></p></div>
   </div>
    </body>
      </html>`
    );
    popupWin?.document.close();
  } 
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
