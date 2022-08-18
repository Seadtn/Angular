import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';
import { ConfirmationToken } from './confirmation-token';
import { Concours } from './concours';
import { Question } from './question';
import { Reponse } from './reponse';
import { timeout} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  cin!:number;
  private baseURL ="http://localhost:8080/api/values";
  id!:number;
  token!:String;
  updated:boolean=false;
  selectedFile!: File;
  selectedCv!: File;
  retrievedImage: any;
  base64Data: any;
  sessionEmail:any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  client=new Client();
  constructor(private httpClient : HttpClient) { }
  createClient(client:Client):Observable<Client>{
    return this.httpClient.post<Client>(`${this.baseURL+"/register"}`,client);
  }
  Login(client:Client):Observable<Client>{
    return this.httpClient.post<Client>(`${this.baseURL+"/login"}`,client);
  }
  getUserBymail(email:string|null):Observable<Client>{
    return this.httpClient.get<Client>(`${this.baseURL+"/usr"}/${email}`).pipe(
      timeout(1000)
  );;

  }
  getTokenById(id:number):Observable<ConfirmationToken>{
    return this.httpClient.get<ConfirmationToken>(`${this.baseURL+"/login"}/${id}`);

  }
  verifCin(client:Client):Observable<Client>{
    return this.httpClient.post<Client>(`${this.baseURL+"/forgot"}`,client);
  }
  verifCR(cin:number,token:String):Observable<ConfirmationToken>{
    return this.httpClient.post<ConfirmationToken>(`${this.baseURL+"/Forgot"}/${token}`,cin);
  }
  updatePassword(cin:number,password:String):Observable<ConfirmationToken>{
    return this.httpClient.put<ConfirmationToken>(`${this.baseURL+"/updatePassword"}/${password}`,cin);
  }
  CreateConcours(concours:FormData):Observable<any>{
    return this.httpClient.post(`${this.baseURL+"/concours"}`,concours);
  }
  Inscription(formdata:FormData){
    return this.httpClient.post(`${this.baseURL+"/inscrir"}`,formdata);
  }
  modif(formdata:FormData){
    return this.httpClient.put(`${this.baseURL+"/modif"}`,formdata);
  }
  getConcours(): Observable<Concours[]>{
    return this.httpClient.get<Concours[]>(`${this.baseURL+"/conc"}`);
  }

  getReponse(): Observable<Reponse[]>{
    return this.httpClient.get<Reponse[]>(`${this.baseURL+"/reps"}`);
  }
  addQuestion(ques:FormData):Observable<any>{
    return this.httpClient.post(`${this.baseURL+"/question"}`,ques);
  }
  DeleteAllRows(){
    return this.httpClient.delete(`${this.baseURL+"/rows"}`);
  }
  DeleteCr(){
    return this.httpClient.delete(`${this.baseURL+"/deleteConcours"}`);
  }
  getQuestion():Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.baseURL+"/ques"}`);
  }
  getlogo(): Observable<any>{
    return this.httpClient.get(`${this.baseURL+"/logo"}`,{ responseType: 'text' });
  }
  getCv(id:number): Observable<any>{
    return this.httpClient.get(`${this.baseURL+"/cv/"}${id}`,{ responseType: 'text' })
  }
  setCin(cin:number){
    this.cin=cin;
  }
  getCin(){
    return this.cin;
  }
  setUpdated(up:boolean){
    this.updated=up;
  }
  getUpdated(){
    return this.updated;
  }
  getImage() {
    this.httpClient.get(`${this.baseURL+"/image/"}` + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  getReponseByid(id :number):Observable<Reponse>{
    return this.httpClient.get<Reponse>(`${this.baseURL+"/dossier/"}${id}`);
  }
}
