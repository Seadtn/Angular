import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Question } from '../question';
import { Reponse } from '../reponse';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})
export class DossierComponent implements OnInit {
  btn:boolean=true;
  q: Question[] = [];
  r: String[] = [];
  rf: String[] = [];
  i:number=0;
  j:number=1;
  id!:number;
  NumDossier!:number;
  nom!:string;
  prenom!:string;
  navbarOpen = false;
  titre!:string;
  cin!:number;
  taille!:number;
  pdf1:string="http://localhost:8080/api/values/cv/";
  constructor(private router:Router, private clientService:ClientService,private actroute:ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem('role')=='USER'){
      this.router.navigate(['/UserPage']);
    }
    this.clientService.getQuestion().subscribe(data => {
      this.taille=data.length;
      this.q= data;
        });

    this.getReponses();
  }
  return(){
    this.router.navigate(['/AdminPage']);
  }
  
 getReponses(){
   this.id= this.actroute.snapshot.params['id'];
   this.clientService.getReponseByid(this.id).subscribe(data=>{
       this.i=0;
       while(this.i<this.taille){
        switch(this.i){
          case 0:{this.r[0]=data.reponse1;break;}
          case 1:{this.r[1]=data.reponse2;break;}
          case 2:{this.r[2]=data.reponse3;break;}
          case 3:{this.r[3]=data.reponse4;break;}
          case 4:{this.r[4]=data.reponse5;break;}
          case 5:{this.r[5]=data.reponse6;break;}
          case 6:{this.r[6]=data.reponse7;break;}
          case 7:{this.r[7]=data.reponse8;break;}
          case 8:{this.r[8]=data.reponse9;break;}
          case 9:{this.r[9]=data.reponse10;break;}
        }
        this.i=this.i+1;
      }
      this.rf[0]=this.r[0].substring(1,this.r[0].length);
      while(this.j<this.taille-1){
        this.rf[this.j]=this.r[this.j].substring(0,this.r[this.j].length)
        this.j=this.j+1;
      }
      this.rf[this.taille-1]=this.r[this.taille-1].substring(0,this.r[this.taille-1].length-1);
       this.NumDossier=data.id;
       this.nom=data.userapp.nom;
       this.prenom=data.userapp.prenom;
       this.cin=data.userapp.cin;
       this.titre=data.userapp.titre;
    });
  }
  getCV(){
    this.id= this.actroute.snapshot.params['id'];
    this.clientService.getCv(this.id).subscribe( response =>{
      console.log(this.pdf1);
  });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/Login']); 
  }
}