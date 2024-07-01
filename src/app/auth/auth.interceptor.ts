import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { CookieService } from 'ngx-cookie-service';
export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    // const alertService = inject(AlertService);
    const cookieService = inject(CookieService);
    const alertService = inject(AlertService);
    console.log(req);
    const token = cookieService.get('access_token')
    let clonedRequest = req;
    if (token) {
    clonedRequest = req.clone({
        setHeaders: {
            Authorization: token,
        },
        withCredentials: true
    });
    }
    return next(clonedRequest).pipe(
        catchError((error)=>{
            alertService.showError('An error occurred');
            return throwError(() => new Error('HTTP Error'));
        })
    );
};