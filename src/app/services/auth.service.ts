import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) {
    this.loggedIn = !!localStorage.getItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/who_we_are']);
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}