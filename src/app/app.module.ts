import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './nav/sidebar/sidebar.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { BranchesComponent } from './branches/branches.component';
import { EmployeesComponent } from './employees/employees.component';
import { FilterPipe } from './Pipe/filter.pipe';
import { FilterEmployeePipe } from './Pipe/filteremployee.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';
import {filterBranchPipe} from 'src/app/Pipe/filterBranch.pipe'
import { FilterShiftTypePipe } from './Pipe/filterShiftType.pipe';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    SidebarComponent,
    ShiftsComponent,
    BranchesComponent,
    EmployeesComponent,
    FilterPipe,
    FilterEmployeePipe,
    filterBranchPipe,
    FilterShiftTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
