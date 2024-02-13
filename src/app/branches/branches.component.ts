import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/Models/Branch';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit{
  Branches: Branch[] = [];
  show = false;
  constructor(private apiService: ApiService) {
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
  
}
