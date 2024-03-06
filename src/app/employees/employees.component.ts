import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Employee } from 'src/Models/Employee';
import { RegisterEmployee } from 'src/Models/RegisterEmployee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{
  searchEmployee: string = "";
  Employees: Employee[] = [];
  Roles: string[] = []
  Employee: Employee = {
    id: "899d9d62-b374-47af-9716-f033af1ac9e6",
    userName: "Bobby.bob",
    salary: "0",
    phoneNumber: "123456",
    email: "Bobby@mifflin.com",
    roles: []
  }
  registerEmployee: RegisterEmployee = {
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    password: "",
    roles: [],
    branchId: 0,
    phone: ""
  }
  show = false;
  constructor(private apiService: ApiService, private zone: NgZone) {
  }
  ngOnInit(): void {
    this.apiService.GetEmployees().subscribe({
      next: (r) => this.Employees = r,
      error: (e) => console.log(e),
      complete: () => setTimeout(() => {
        this.show = true;
      }, 1000)
    });
    this.apiService.GetEmployeeRoles().subscribe({
      next: (r) => this.Roles = r,
      error: (e) => console.log(e),
      complete: () => console.log(this.Roles)
    })
  }
  onInspectEmployee(employee: Employee): void{
    this.zone.run(() => 
    {
      this.Employee = employee;
      console.log(employee)
    });
  }
  onPatchEmployee(employee: Employee): void
  {
    this.apiService.PatchEmployee(employee).subscribe(
      {
        next: (r) => console.log(r),
        error: (e) => console.log(e)
      })
  }
  onRegisterEmployee(registerEmployee: RegisterEmployee): void{
    this.apiService.RegisterEmployee(registerEmployee).subscribe(
      {
        next: (r) => console.log(r),
        error: (e) => console.log(e),
        complete: () => console.log("yippi!")
      })
  }
  onInspectAddEmployee(): void{
    this.zone.run(() => 
    {
      this.registerEmployee = {
        firstName: "",
        lastName: "",
        email: "",
        salary: "",
        password: "",
        roles: [],
        branchId: 0,
        phone: ""
      }
    });
  }
}

        