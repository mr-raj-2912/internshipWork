import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
readonly apiUrl = 'http://localhost:5001/api/';
 
constructor(private http:HttpClient) { }
httpOptions={headers : new HttpHeaders({
  'Content-Type': 'application /json'
})};
getEmployeeById(request:number):Observable <any> {
  return this.http.get<any>(this.apiUrl + 'Employee/getEmployeeById?id='+ request, this.httpOptions );
}
getEmployee():Observable <any[]> {
  return this.http.get<any[]>(this.apiUrl + 'Employee/getEmployee', this.httpOptions );
}
deletEmployee(id : number):Observable <any> {
  return this.http.delete<any>(this.apiUrl + 'Employee/DeleteEmployee?id='+ id,this.httpOptions);
}
addEmployee(EmployeeData: any): Observable<any> {
  return this.http.post<any>(this.apiUrl +'Employee/InsertEmployee', EmployeeData, this.httpOptions);
}
editEmployee(EmployeeData: any): Observable<any> {
  debugger
  return this.http.put<any>(this.apiUrl+"Employee/UpdateEmployee" , EmployeeData, this.httpOptions);
}
}
