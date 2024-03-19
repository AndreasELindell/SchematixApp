import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { BranchesComponent } from './branches/branches.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/authguard.guard';

const routes: Routes = [
  {path: 'Dashboard', component: DashboardComponent, canActivate:[authGuard]},
  {path: 'Shifts', component: ShiftsComponent, canActivate:[authGuard]},
  {path: 'Branches', component: BranchesComponent, canActivate:[authGuard]},
  {path: 'Employees', component: EmployeesComponent, canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
