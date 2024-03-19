import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/Models/Branch';
import { EmployeeWithShifts } from 'src/Models/EmployeeWithShifts';
import { ApiService } from '../services/api.service';
import { Shift } from 'src/Models/Shift';
import {NativeDateAdapter} from '@angular/material/core';
import { Time } from '@angular/common';
import { Employee } from 'src/Models/Employee';
import { WorkTask } from 'src/Models/WorkTask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


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
  Tasks: WorkTask[] = [];
  ShiftTypes: string[] = ["Workday",
    "Sickday",
    "Vacationday"];
  TaskTypes:string[] = ["Work",
    "Break", "Meeting"];
  TaskType!: string;
  WeekDates: any;
  show = false;
  NewShift!: Shift;
  NewShiftEmployee!: Employee;
  Date!: Date;
  Start!:string;
  End!:string;
  TaskStart!: string;
  TaskEnd!: string;
  ShiftType!: string;
  Length!: any;
  shiftId = 0;
  constructor(private apiService: ApiService, private snackbar: MatSnackBar, private router: Router) {}

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
  addTasktoList(): void
  {
    let task: WorkTask = {
      id: 0,
      start: "00:00",
      end: "00:00",
      type: "Work"
    }
    this.Tasks.push(task);
  }

  removeTask(task: WorkTask): void{
    this.Tasks.splice(this.Tasks.indexOf(task), 1)
  }

  deleteShift(): void
  {
    this.apiService.DeleteShiftFromEmployee(this.shiftId).subscribe({
      next: (r) => this.snackbar.open("Shift is Delete", "Undo", {
        duration: 3000
      }),
      error: (e) => this.snackbar.open(e.message, "Undo", {
        duration: 3000
      }),
      complete: () => this.ngOnInit()
    })
    
  }

  addShift(): void{
    let start: Time = {
      hours: parseInt(this.Start.substring(0, this.Start.indexOf(":"))),
      minutes: parseInt(this.Start.split(":")[1]),
    } 
    let end: Time = {
      hours: parseInt(this.End.substring(0, this.Start.indexOf(":"))),
      minutes: parseInt(this.End.split(":")[1]),
    }

    let length: Time = {
      hours: end.hours - start.hours,
      minutes: 0
    }
    if(end.minutes - start.minutes < 0)
    {
      length.hours -= 1;
      length.minutes = (end.minutes - start.minutes) + 60
    }
    else{
      length.minutes = (end.minutes - start.minutes)
    }
    let stringLength ="";

    if(length.hours > 9)
    {
      if(length.minutes > 9)
      {
        stringLength = `${length.hours}:${length.minutes}:00`
      }
      else{
        stringLength = `${length.hours}:0${length.minutes}:00`
      }
    }
    else{
      if(length.minutes > 9)
      {
        stringLength = `0${length.hours}:${length.minutes}:00`
      }
      else{
        stringLength = `0${length.hours}:0${length.minutes}:00`
      }
    }
    this.Tasks.forEach(task => {
      if(task.start.length < 6 || task.end.length < 6)
      {
        task.start =  `${task.start}:00`;
        task.end = `${task.end}:00`;
      }
    });
    this.NewShift = {
      id: this.shiftId,
      start:  `${this.Start}`,
      end:  `${this.End}`,
      length: stringLength,
      branch: this.FilteredBranch,
      type: this.ShiftType,
      employee: this.NewShiftEmployee,
      date: `${this.Date.getFullYear()}-${(this.Date.getMonth() +1).toString().padStart(2, '0')}-${this.Date.getDate().toString().padStart(2, '0')}`,
      tasks: []
    }
    console.log(this.NewShift)
    this.apiService.AddShiftToEmployee(this.NewShift).subscribe({
      next: (r) => console.log(r),
      error: (e) => console.log(e),
      complete: () => {this.ngOnInit(); this.snackbar.open("Added shift", 'Undo', {duration: 3000})}
    })
  }

  showShift(shifts: Shift[], date: string): void {
    var shift = shifts.find(shift => shift.date === date);

    this.ShiftType = shift!.type;
    this.shiftId = shift?.id!
    this.Start = `${shift?.start}`;
    this.End = `${shift?.end}`;
    this.NewShiftEmployee = shift?.employee!
    this.FilteredBranch = this.Branches.find(b => b.id === shift?.branch.id)!;
    this.FilteredBranch.employees.filter(e => e.id !== shift?.employee.id)
    let [year, month, day] = date.split("-").map(Number);
    this.Date = new Date(year, month -1, day);
    this.Tasks = shift!.tasks;
    
  }
  showNewShift(shifts: Shift[], date: string): void {
    var shift = shifts.find(shift => shift.date === date);

    this.ShiftType = shift!.type;
    this.shiftId = shift?.id!
    this.Start = "";
    this.End = "";
    this.NewShiftEmployee = shift?.employee!
    this.FilteredBranch = this.Branches.find(b => b.id === shift?.branch.id)!;
    this.FilteredBranch.employees.filter(e => e.id !== shift?.employee.id)
    let [year, month, day] = date.split("-").map(Number);
    this.Date = new Date(year, month -1, day);
    this.Tasks = shift!.tasks;
    
  }
  updateShift(): void {
    let start: Time = {
      hours: parseInt(this.Start.substring(0, this.Start.indexOf(":"))),
      minutes: parseInt(this.Start.split(":")[1]),
    } 
    let end: Time = {
      hours: parseInt(this.End.substring(0, this.Start.indexOf(":"))),
      minutes: parseInt(this.End.split(":")[1]),
    }

    let length: Time = {
      hours: end.hours - start.hours,
      minutes: 0
    }
    if(end.minutes - start.minutes < 0)
    {
      length.hours -= 1;
      length.minutes = (end.minutes - start.minutes) + 60
    }
    else{
      length.minutes = (end.minutes - start.minutes)
    }
    let stringLength ="";

    if(length.hours > 9)
    {
      if(length.minutes > 9)
      {
        stringLength = `${length.hours}:${length.minutes}:00`
      }
      else{
        stringLength = `${length.hours}:0${length.minutes}:00`
      }
    }
    else{
      if(length.minutes > 9)
      {
        stringLength = `0${length.hours}:${length.minutes}:00`
      }
      else{
        stringLength = `0${length.hours}:0${length.minutes}:00`
      }
    }
    this.Tasks.forEach(task => {
      if(task.start.length < 6 || task.end.length < 6)
      {
        task.start =  `${task.start}:00`;
        task.end = `${task.end}:00`;
      }
    });

    this.NewShift = {
      id: this.shiftId,
      start:  `${this.Start}`,
      end:  `${this.End}`,
      length: stringLength,
      branch: this.FilteredBranch,
      employee: this.NewShiftEmployee,
      type: this.ShiftType,
      date: `${this.Date.getFullYear()}-${(this.Date.getMonth() +1).toString().padStart(2, '0')}-${this.Date.getDate().toString().padStart(2, '0')}`,
      tasks: this.Tasks
    }

    this.apiService.UpdateShift(this.NewShift).subscribe({
      next: (r) => console.log(r),
      error: (e) => console.log(e),
      complete: () => this.snackbar.open("Updated shift", 'Undo', {duration: 3000})
    })
    this.Tasks = [];
  }

  isMatchingDate(shifts: Shift[], date: string): boolean {
    return shifts.some(shift => date === shift.date);
  }

  MatchingDate(shifts: Shift[], date: string): Shift | undefined {
    return shifts.find(shift => shift.date === date);
  }

  changeWeek(number: number){
    this.show = false
    this.Week += number;
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
    this.apiService.GetBranches().subscribe({
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
