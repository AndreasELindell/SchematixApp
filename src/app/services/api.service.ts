import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Employee } from 'src/Models/Employee';
import { Branch } from 'src/Models/Branch';
import { EmployeeWithShifts } from 'src/Models/EmployeeWithShifts';
import { Shift } from 'src/Models/Shift';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = "https://localhost:7184/api";
  constructor(private http: HttpClient) { }

  GetEmployees(): Observable<Employee[]>
  {
   return this.http.get<Employee[]>(this.baseUrl + "/User");
  }
  GetEmployeesWithShifts(week: number): Observable<EmployeeWithShifts[]>
  {
    return this.http.get<EmployeeWithShifts[]>(`${this.baseUrl}/Shift?week=${week}`);
  }
  GetBranches(): Observable<Branch[]>
  {
    return this.http.get<Branch[]>(this.baseUrl + "/Branch");
  }
  GetShifts(): Observable<Shift[]>
  {
    return this.http.get<Shift[]>(this.baseUrl + "/Shift/branch/3");
  }
}
