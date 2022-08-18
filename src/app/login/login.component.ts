import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { ConfirmationToken } from '../confirmation-token';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  client:Client=new Client();
  confirToken:ConfirmationToken=new ConfirmationToken();
  alert:boolean=false;
  id!:number;
  test!:number;
  Success:boolean=false;
  token!:String;
  updated:boolean=this.clientService.getUpdated();
  constructor(private clientService: ClientService, private router:Router,private r:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.test= this.r.snapshot.params['id'];
    if(this.test>0){
    this.afficheToken();}
  }
  Login(){
    this.clientService.Login(this.client).subscribe(data =>{
      if(data.userRole=="USER"){
        this.saveSession(data.email);
        this.clientService.sessionEmail=data.email;
        localStorage.setItem('role',data.userRole);
        this.clientService.client=data;
       this.goToUserPage();
      }else if(data.userRole=="ADMIN"){
        this.saveSession(data.email); 
        this.clientService.sessionEmail=data.email;
        localStorage.setItem('role',data.userRole);
        this.clientService.client=data;
        this.goToAdminPage();
      }
    },
    error =>this.alert=true);
  }
  goToUserPage(){
    this.router.navigate(['/UserPage']);

  }
  goToAdminPage(){
    this.router.navigate(['/AdminPage']);

  }
  closeAlert(){
    this.alert=false;
    this.updated=false;
  }
  closeMessage(){
    this.Success=false;
    this.router.navigate(['/Login']);
  }
  afficheToken(){
    this.id= this.r.snapshot.params['id'];
    this.clientService.getTokenById(this.id).subscribe(data =>{
      this.token=data.token;
       this.Success=true; },error=>this.router.navigate(['/Login'])
      );
  }
  saveSession(email:string){
    sessionStorage.setItem('email',email);
  }

}
