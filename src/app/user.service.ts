import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

readonly apiUrl = 'http://localhost:5001/api/';
 
constructor(private http:HttpClient) { }
httpOptions={headers : new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization' : "Bearer "+ localStorage.getItem('jwt') || ""
})};
getusers(userData : any ):Observable <any> {
  return this.http.post<any>(this.apiUrl + 'User/getUsers', userData , this.httpOptions );
}
getUserById(userData : any):Observable<any>{
  return this.http.post<any>(this.apiUrl + 'User/getUsers' , userData , this.httpOptions);
}
deletusers(id : number):Observable <any> {
  return this.http.delete<any>(this.apiUrl + 'User/DeleteUser?id='+id,this.httpOptions);
}
addUser(userData: any): Observable<any> {
  return this.http.post<any>(this.apiUrl +'User/InsertUsers', userData, this.httpOptions);
}
editUser(userData: any): Observable<any> {
  return this.http.put<any>(this.apiUrl+"User/UpdateUsers", userData, this.httpOptions);
}
authenticateUser(userData:any):Observable<any>{
  return this.http.post<any>(this.apiUrl + "User/Authenticate", userData, this.httpOptions);
}
getRole():Observable<any[]>{
  return this.http.get<any[]>(this.apiUrl + "User/getRole", this.httpOptions);
}
getCountry():Observable<any[]>{
  return this.http.get<any[]>(this.apiUrl + "User/getCountry", this.httpOptions);
}
getState(id : number):Observable<any>{
  return this.http.get<any>(this.apiUrl + "User/getState?id="+id, this.httpOptions);
}
getCity(id : number):Observable<any>{
  return this.http.get<any>(this.apiUrl + "User/getCity?id="+id, this.httpOptions);
}
}
