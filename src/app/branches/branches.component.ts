import { Component, NgZone, OnInit } from '@angular/core';
import { Branch } from 'src/Models/Branch';
import { ApiService } from '../services/api.service';
import { Employee } from 'src/Models/Employee';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit{
  Branches: Branch[] = [];
  Branch: Branch = {
    id: 0,
    name: "",
    managerId: "",
    employees: []
  }
  Managers: Employee[] = []
  EmployeesNotAdded: Employee[] = [];
  EmployeesToAdd: Employee[] = [];
  searchBranch: string = "";
  show = false;
  constructor(private apiService: ApiService, private zone: NgZone) {
  }
  ngOnInit(): void {
    this.apiService.GetBranches().subscribe({
      next: (r) => this.Branches = r,
      error: (e) => console.log(e),
      complete: () => setTimeout(() => {
        this.show = true;
      }, 1000)
    });
  }

  onInspectBranch(branch: Branch): void{
    this.zone.run(() => 
    {
      this.Branch = branch;
    });
  }
  onLoadEmployees(): void{
    this.apiService.GetEmployees().subscribe({
      next: (r)  => this.EmployeesNotAdded = r,
      error: (e) => console.log(e),
      complete: () => this.EmployeesNotAdded.filter(item => !this.Branch.employees.includes(item))
    })
  }

  addEmployeeToList(employee: Employee)
  {
    const index = this.EmployeesNotAdded.findIndex(item => item == employee);
    this.EmployeesNotAdded.splice(index, 1);
    this.EmployeesToAdd.push(employee);
  }

  removeEmployeeFromList(employee: Employee): void
  {
    const index = this.EmployeesToAdd.findIndex(item => item == employee);
    this.EmployeesToAdd.splice(index, 1);
    this.EmployeesNotAdded.push(employee);
  }
  onAddEmployeesToBranch(): void
  {
    let EmployeeIds: string [] = this.EmployeesToAdd.map(item => item.id) 
    this.apiService.AddEmployeeToBranch(EmployeeIds, this.Branch).subscribe(
      {
        next: (r) => console.log(r),
        error: (e) => console.log(e),
        complete: () => {
          this.Branch.employees.push(...this.EmployeesToAdd), 
          this.EmployeesNotAdded = [], 
          this.EmployeesToAdd = [],
          window.location.reload()}
      })
  }
  onRemoveEmployeeFromBranch(employee: Employee)
  {
    this.apiService.RemoveEmployeeFromBranch(employee.id, this.Branch).subscribe(
      {
        next: (r) => console.log(r),
        error: (e) => console.log(e),
        complete: () => window.location.reload()
      });
  }
  onInspectEditManager():void
  {
    this.apiService.GetManagers().subscribe({
      next: (r) => this.Managers = r,
      error: (e) => console.log(e),
      complete: () => console.log(this.Managers)
    })
  }
  onUpdateManager(branch: Branch):void{
    this.apiService.PatchBranch(branch).subscribe({
      next: (r) => console.log(r),
      error: (e) => console.log(e)
    })
  }
}
