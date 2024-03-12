import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Employee } from 'src/Models/Employee';
import { Branch } from 'src/Models/Branch';
import { EmployeeWithShifts } from 'src/Models/EmployeeWithShifts';
import { Shift } from 'src/Models/Shift';
import { RegisterEmployee } from 'src/Models/RegisterEmployee';

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
  GetBranchEmployees(branch: Branch): Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.baseUrl + `/User/Branch/${branch.id}`)
  }
  GetBranchesWithoutEmployees():  Observable<Branch[]>
  {
    return this.http.get<Branch[]>(this.baseUrl + "/Branch/noEmp");
  }
  GetShifts(week: number): Observable<Shift[]>
  {
    return this.http.get<Shift[]>(this.baseUrl + `/Shift/?week=${week}`);
  }
  GetShiftsForBranch(week: number, branch: Branch): Observable<EmployeeWithShifts[]>
  {
    return this.http.get<EmployeeWithShifts[]>(this.baseUrl + `/Shift/branch/${branch.id}?week=${week}`)
  }
  PatchEmployee(employee: Employee): Observable<Employee>
  {
    const body = [{
      op: "replace",
      path: "phoneNumber",
      value: employee.phoneNumber
    },{
      op: "replace",
      path: "salary",
      value: employee.salary
    },{
      op: "replace",
      path: "email",
      value: employee.email
    },{
      op: "replace",
      path: "userName",
      value: employee.userName
    },
    {
      op: "replace",
      path: "roles",
      value: employee.roles
    }];
    return this.http.patch<Employee>(`${this.baseUrl}/User/${employee.id}`, body)
  }
  RegisterEmployee(registerEmployee: RegisterEmployee): Observable<RegisterEmployee>
  {
    return this.http.post<RegisterEmployee>(`${this.baseUrl}/register`, registerEmployee);
  }
  AddEmployeeToBranch(employeeIds: string[], branch: Branch): Observable<any>
  {
    return this.http.post<any>(`${this.baseUrl}/Branch/${branch.id}`, employeeIds);
  }
  RemoveEmployeeFromBranch(employeeId: string, branch: Branch): Observable<any>
  {
    return this.http.delete<any>(`${this.baseUrl}/Branch/${branch.id}/${employeeId}`);
  }
  GetEmployeeRoles(): Observable<string[]>
  {
    return this.http.get<string[]>(this.baseUrl + "/user/roles");
  }
  GetManagers(): Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.baseUrl + "/user/manager")
  }
  PatchBranch(branch: Branch): Observable<Branch>
  {
    const body = [
      {
        op: "replace",
        path: "ManagerId",
        value: branch.manager?.id
      }
    ]
    return this.http.patch<Branch>(this.baseUrl + `/branch/${branch.id}`, body)
  }
  AddShiftToEmployee(shift: Shift): Observable<Shift>
  {
    return this.http.post<Shift>(this.baseUrl + `/shift`, shift)
  }
  UpdateShift(shift: Shift): Observable<Shift>
  {
    return this.http.put<Shift>(this.baseUrl + "/shift", shift)
  }
  DeleteShiftFromEmployee(shiftId: number): Observable<Shift>
  {
    return this.http.delete<Shift>(this.baseUrl + `/shift/${shiftId}`);
  }
}
