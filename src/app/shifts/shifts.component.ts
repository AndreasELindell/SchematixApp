import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/Models/Branch';
import { EmployeeWithShifts } from 'src/Models/EmployeeWithShifts';
import { ApiService } from '../services/api.service';
import { Shift } from 'src/Models/Shift';
import {NativeDateAdapter} from '@angular/material/core';
import { Time } from '@angular/common';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css'],
  providers: [NativeDateAdapter]
})
export class ShiftsComponent implements OnInit{

  Branches: Branch[] = []
  FilteredBranch!: Branch;
  Week!: number;
  Year = new Date().getFullYear();
  EmployeeWithShifts: EmployeeWithShifts[] =[];
  WeekDates: any;
  show = false;
  NewShift!: Shift;
  Date!: Date;
  Start!:Time;
  End!:Time;
  Length!: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.Week = this.getWeekNumber(new Date());
    this.getBranches()
    this.apiService.GetEmployeesWithShifts(this.Week).subscribe({
      next: (r) => this.EmployeeWithShifts = r,
      error: (e) => console.log(e),
      complete: () =>  setTimeout(() => {
        this.show = true;
      }, 1000)
    });
    this.WeekDates = this.getDatesFromWeek(this.Week, this.Year)
  }

  test(): void{
    


    console.log(typeof this.Start)
  }

  changeWeek(number: number){
    this.show = false
    this.Week += number;
    console.log(this.FilteredBranch)
    if(this.FilteredBranch?.id > 0)
    {
      this.apiService.GetShiftsForBranch(this.Week, this.FilteredBranch).subscribe({
        next: (r) => this.EmployeeWithShifts = r,
        error: (e) => console.log(e)
  
      })
    }
    else{
      this.apiService.GetEmployeesWithShifts(this.Week).subscribe({
        next: (r) => this.EmployeeWithShifts = r,
        error: (e) => console.log(e)
      });
    }
    this.WeekDates = this.getDatesFromWeek(this.Week, this.Year)
    setTimeout(() => {
      this.show = true;
    }, 1000);
  }

  getBranches(): void
  {
    this.apiService.GetBranchesWithoutEmployees().subscribe({
      next: (r) => this.Branches = r,
      error: (e) => console.log(e)
    })
  }
  getFilterBranch(week:number, branch: Branch): void 
  {
    this.show = false
    this.apiService.GetShiftsForBranch(week, branch).subscribe({
      next: (r) => this.EmployeeWithShifts = r,
      error: (e) => console.log(e),
      complete: () =>  setTimeout(() => {
        this.show = true;
      }, 1000)

    })
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
