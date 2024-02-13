import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Employee } from 'src/Models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{

  Employees: Employee[] = [];
  show = false;
  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.apiService.GetEmployees().subscribe({
      next: (r) => this.Employees = r,
      error: (e) => console.log(e),
      complete: () => setTimeout(() => {
        this.show = true;
      }, 1000)
    });
    
  }
}
