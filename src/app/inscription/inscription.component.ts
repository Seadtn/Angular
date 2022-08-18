import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Client } from '../client';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationToken } from '../confirmation-token';
@Component({
  selector: 'app-inscreption',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscreptionComponent implements OnInit {
   client:Client=new Client();
   alert:boolean=false;
   confirToken:ConfirmationToken=new ConfirmationToken();
   id!:number;
  constructor(private clientService: ClientService, private router:Router,private r:ActivatedRoute) { }
 
  ngOnInit(): void {
  }
  saveClient(){
    this.clientService.createClient(this.client).subscribe(data =>{
      console.log(data);
      this.TokenById(data.id);
    },
    error =>this.alert=true);
  }
  goToLogin(){
    this.router.navigate(['/Login']);

  }
  closeAlert(){
    this.alert=false;
  }
  onSubmit(){
    this.saveClient();
   }
   TokenById(id:number){
     this.router.navigate(['login',id]);

   }

}
