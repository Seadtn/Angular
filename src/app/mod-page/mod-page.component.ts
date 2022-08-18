import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Question } from '../question';
import { Reponse } from '../reponse';

@Component({
  selector: 'app-mod-page',
  templateUrl: './mod-page.component.html',
  styleUrls: ['./mod-page.component.css']
})
export class ModPageComponent implements OnInit {
  btn:boolean=true;
  q: Question[] = [];
  r: string[] = [];
  rep= new Reponse();
  i:number=0;
  j:number=1;
  id!:number;
  idUser!:number;
  idWrote!:number;
  id1!:string;
  NumDossier!:number;
  taille!:number;
  image:any;
  pdf1:string="http://localhost:8080/api/values/cv/";
  constructor(private router:Router, private clientService:ClientService,private actroute:ActivatedRoute) { }

  ngOnInit(): void {
  this.clientService.getUserBymail(sessionStorage.getItem('email')).subscribe(data => {
      this.idUser=data.id
      this.idWrote= this.actroute.snapshot.params['id'];
      if(this.idUser!=this.idWrote){
        this.router.navigate(['modpage',this.idUser]);
        }
        this.clientService.getQuestion().subscribe(data => {
          this.taille=data.length;
          this.q= data;
            });
            this.clientService.getlogo().subscribe( response =>{
              this.image= response;
          });
        this.getReponses();   
    },error=>console.log(error));
  }
  getReponses(){
    this.id= this.idUser;
    this.clientService.getReponseByid(this.id).subscribe(data=>{
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
        this.rep.reponses[0]=this.r[0].substring(2,this.r[0].length-1);
        this.j=1;
        while(this.j<this.taille-1){
              this.rep.reponses[this.j]=this.r[this.j].substring(1,this.r[this.j].length-1)
              this.j=this.j+1;
        }
        this.rep.reponses[this.taille-1]=this.r[this.taille-1].substring(1,this.r[this.taille-1].length-2);
        this.NumDossier=data.id;
     });
   }
   getCV(){
    this.id= this.actroute.snapshot.params['id'];
    this.clientService.getCv(this.id).subscribe( response =>{
      console.log(this.pdf1);
  });
  }
  modif(){
    const uploadImageData = new FormData();
  uploadImageData.append('reponses',JSON.stringify(this.rep.reponses));
  this.id1= this.actroute.snapshot.params['id'];
  uploadImageData.append('id',this.id1);
  this.clientService.modif(uploadImageData).subscribe(data =>{
    this.router.navigate(['/ModifierPage',this.id]); 
  },
  error =>console.log(error));

  }
  trackByFn(index:number, item:any) {
    return index;  
  }
}
