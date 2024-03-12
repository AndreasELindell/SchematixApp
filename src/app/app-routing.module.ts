import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { BranchesComponent } from './branches/branches.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Shifts', component: ShiftsComponent},
  {path: 'Branches', component: BranchesComponent},
  {path: 'Employees', component: EmployeesComponent},
  {path: '', redirectTo: '/Dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
