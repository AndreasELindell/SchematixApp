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
import { TestdashComponent } from './testdash/testdash.component';

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
    TestdashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
