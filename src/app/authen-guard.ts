import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ClientService } from "./client.service";
@Injectable()
export class AuthenGuard  implements CanActivate{
    constructor( private clientService:ClientService,private router :Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('email')) {
            if(localStorage.getItem('role')=="USER"){
                this.router.navigate(['/UserPage']);
                return false;
             }else if (localStorage.getItem('role')=="ADMIN"){
                 this.router.navigate(['/AdminPage']);
                 return false;
             }
        }
        return true;
    }
}