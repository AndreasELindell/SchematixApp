import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Employee } from 'src/Models/Employee';
import { Branch } from 'src/Models/Branch';
import { EmployeeWithShifts } from 'src/Models/EmployeeWithShifts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  searchBranch: string = "";
  searchEmployee: string = "";
  Week!: number;
  Employees: Employee[] = [];
  Branches: Branch[] = [];
  Year = new Date().getFullYear();
  EmployeeWithShifts: EmployeeWithShifts[] =[];
  WeekDates: any;
  show = false;
  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.Week = this.getWeekNumber(new Date());
    this.apiService.GetEmployees().subscribe({
      next: (r) => this.Employees = r,
      error: (e) => console.log(e)
    });
    this.apiService.GetBranches().subscribe({
      next: (r) => this.Branches = r,
      error: (e) => console.log(e)
    });
    this.apiService.GetEmployeesWithShifts(this.Week).subscribe({
      next: (r) => this.EmployeeWithShifts = r,
      error: (e) => console.log(e),
      complete: () =>  setTimeout(() => {
        this.show = true;
      }, 1000)
    });
    this.WeekDates = this.getDatesFromWeek(this.Week, this.Year)
  }

  changeWeek(number: number){
    this.show = false
    this.Week += number;
    this.apiService.GetEmployeesWithShifts(this.Week).subscribe({
      next: (r) => this.EmployeeWithShifts = r,
      error: (e) => console.log(e)
    });
    this.WeekDates = this.getDatesFromWeek(this.Week, this.Year)
    setTimeout(() => {
      this.show = true;
    }, 1000);
  }
  getWeekNumber(date: Date): number {
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }
  getDatesFromWeek(weekNumber:number, year:number) {
    var januaryFirst = new Date(year, 0, 1);
    var firstDayOfYear = januaryFirst.getDay();
    var firstWeekDay = (8 - firstDayOfYear) % 7 || 7; 
    var daysToAdd = (weekNumber - 1) * 7 + firstWeekDay - 5;

    var startDate = new Date(year, 0, daysToAdd);
    var dates = [];

    for (var i = 0; i < 7; i++) {
        var currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        var formattedDate = currentDate.toISOString().slice(0, 10);
        dates.push(formattedDate.toString());
    }

    return dates;
  }
}

