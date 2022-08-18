import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationToken } from '../confirmation-token';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  client:Client=new Client();
  crt:ConfirmationToken=new ConfirmationToken();
  step:any=1;
  token!:String;
  cin!:number;
  alert:boolean=false;
  alert2:boolean=false;
  constructor(private clientService: ClientService, private router:Router,private r:ActivatedRoute) { }

  ngOnInit(): void {
  }
  next(){
    this.step=this.step+1;
  }
  closeAlert(){
    this.alert=false;
    this.alert2=false;
  }
  verifStep1(){
    
    this.clientService.verifCin(this.client).subscribe(data =>{
      this.clientService.setCin(data.cin);
      this.next();
    },
    error =>this.alert=true);
  }
  verifStep2(){
    this.clientService.verifCR(this.clientService.getCin(),this.crt.token).subscribe(data =>{
      this.next();
    },
    error =>this.alert2=true);
  }
  verifStep3(){
    this.clientService.updatePassword(this.clientService.getCin(),this.client.password).subscribe(data =>{
      this.clientService.setUpdated(true);
      this.goToLogin();
    },
    error =>console.log(error));
  }
  goToLogin(){
    this.router.navigate(['/Login']);

  }
}
