import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { InscreptionComponent } from './inscription/inscription.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgotComponent } from './forgot/forgot.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { AdminPageComponent } from './admin-page/admin-page.component'; 
import { AuthGuard } from './auth-guard';
import { AuthenGuard } from './authen-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';
import { CreeConcoursComponent } from './cree-concours/cree-concours.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { ModifierComponent } from './modifier/modifier.component';
import { DossierComponent } from './dossier/dossier.component';
import { ModPageComponent } from './mod-page/mod-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    InscreptionComponent,
    ForgotComponent,
    UserPageComponent,
    ProcedureComponent,
    AdminPageComponent,
    CreeConcoursComponent,
    FormulaireComponent,
    ModifierComponent,
    DossierComponent,
    ModPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    RouterModule,
    SidebarModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [AuthGuard,AuthenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
