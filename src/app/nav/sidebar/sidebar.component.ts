import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private auth: AuthService) {}
  name:string = "";
  ngOnInit(): void {
    if(localStorage.getItem("email"))
    {
      this.name = localStorage.getItem("email")!
    }
  }


  onLogout():void {
    this.auth.logout();
  }
}
