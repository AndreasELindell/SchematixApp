import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFrom = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  isSubmitted = false;
  constructor(private auth: AuthService, 
    private router: Router, 
    private fb: FormBuilder,
    private snackbar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.auth.logout()
  }
  
  onSubmit(): void{
    this.isSubmitted = true;
    this.auth.login(this.loginFrom.getRawValue()).subscribe({
      next: (r) => {this.auth.storeTokens(r)},
      error: (e) => this.snackbar.open("Wrong Email or Password", "",{ duration: 5000}),
      complete: () => {this.auth.setLoggedIn(true); 
        localStorage.setItem("email", this.loginFrom.getRawValue().email!); 
        this.router.navigate(['/Dashboard'])}
    })
    
  }

}
