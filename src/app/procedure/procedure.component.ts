import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Concours } from '../concours';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {
  concours=new Concours();
  dateFin!:string;
  constructor(private router:Router, private clientService:ClientService) { }

  ngOnInit(): void {
    this.clientService.getConcours().subscribe(data=>{
      this.concours=data[0];
     this.dateFin=this.concours.date_fin;
});
  }

}
