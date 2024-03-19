import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("accessToken");

        if(token)
        {
            req = req.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            })
        }
        
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Redirect to the login page or another appropriate location
                    this.router.navigate(['/login']);
                }
                
                return throwError(error);
            })
            );
    }

}