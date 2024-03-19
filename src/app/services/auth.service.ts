import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7184/api';
  private loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) {
    this.checkAccessToken();
  }

  login(loginForm: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginForm)
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  storeTokens(token: any): void{
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
  }

  private checkAccessToken(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.setLoggedIn(true);
    }
  }
}
