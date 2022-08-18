import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { Reponse } from '../reponse';

@Component({
  selector: 'app-cree-concours',
  templateUrl: './cree-concours.component.html',
  styleUrls: ['./cree-concours.component.css']
})
export class CreeConcoursComponent implements OnInit {
   reponse: Reponse[] = [];
   client=new Client();
   btn:boolean=false;
  constructor(private router:Router, private clientService:ClientService) { }

  ngOnInit(): void {
    this. getReponses();
  }
  private getReponses(){
    this.clientService.getReponse().subscribe(data => {
      this.reponse= data;});


}
voirDetails(id:number){
  this.router.navigate(['Dossier',id]);
}
}
