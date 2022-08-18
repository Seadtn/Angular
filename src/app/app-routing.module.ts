import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './auth-guard';
import { AuthenGuard } from './authen-guard';
import { CreeConcoursComponent } from './cree-concours/cree-concours.component';
import { DossierComponent } from './dossier/dossier.component';
import { ForgotComponent } from './forgot/forgot.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { InscreptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { ModPageComponent } from './mod-page/mod-page.component';
import { ModifierComponent } from './modifier/modifier.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { UserPageComponent } from './user-page/user-page.component';


const routes: Routes = [
  {path:'Login', component:LoginComponent,canActivate:[AuthenGuard]},
  {path:'Accueil', component:AccueilComponent},
  {path:'Inscription', component:InscreptionComponent,canActivate:[AuthenGuard]},
  {path:'Forgot', component:ForgotComponent,canActivate:[AuthenGuard]},
  {path:'login/:id', component:LoginComponent},
  {path:'Forgot/:token', component:ForgotComponent},
  {path:'UserPage', component:UserPageComponent,canActivate:[AuthGuard]},
  {path:'ModifierPage/:id', component:ModifierComponent,canActivate:[AuthGuard]},
  {path:'TestPage', component:FormulaireComponent,canActivate:[AuthGuard]},
  {path:'AdminPage', component:AdminPageComponent,canActivate:[AuthGuard]},
  {path:'Dossier/:id', component:DossierComponent,canActivate:[AuthGuard]},
  {path:'modpage/:id', component:ModPageComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'Accueil', pathMatch: 'full'},
  {path:'login/:id',redirectTo:'Accueil', pathMatch: 'full'},
  {path:'Forgot/:token',redirectTo:'Accueil', pathMatch: 'full'},
  {path:'procedure', component:ProcedureComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
