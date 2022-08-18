import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Question } from '../question';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  q: Question[] = [];
  logo!:boolean;
  image:any;
  navbarOpen = false;
  constructor(private router:Router, private clientService:ClientService) { }

  ngOnInit(): void {
    if(localStorage.getItem('role')=='USER'){
      this.router.navigate(['/UserPage']);
    }
    this.clientService.getlogo().subscribe( response =>{
      this.image= response;
      this.logo=true
  });  
    this.getConcours();
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/Login']); 
  }
  private getConcours(){
    this.clientService.getQuestion().subscribe(data => {
      this.q= data;
    console.log(data);});
}
toggleNavbar() {
  this.navbarOpen = !this.navbarOpen;
}

}
