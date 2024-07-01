import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cookieService: CookieService,
    private alertService: AlertService,
  ) {}

  login(email: string, password: string) {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/login`, { email, password })
      .subscribe(
        response => {
          this.cookieService.set('access_token', response.accessToken);
          this.router.navigate(['/who_we_are']);
        }, error => {
          console.error('Login failed', error);
        }
      );
  }

  logout() {
    try{
      // this.http.delete<{message: string}>(`${this.baseUrl}/logout`)
      //   .subscribe(response=>{
      //     this.alertService.showSuccess(response.message);
      //     this.cookieService.delete('access_token');
      //     this.cookieService.delete('_csrf');
      //     this.router.navigate(['/login']);
      //   }, error =>{
      //     console.log('logout failed', error);
      //   })
        this.cookieService.delete('access_token');
        this.cookieService.delete('_csrf');
        this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.cookieService.get('access_token');
  }
}