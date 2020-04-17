import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  baseURL = 'http://cscfutsal.com:3000'
  admin = `${this.baseURL}/admin/`;
  isLogged: boolean;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isLogged = true;
    }
  }

    // ADMIN

    login(admin:any) {
      return this.http.post(this.admin + 'login', admin);
    }

    logout() {
      localStorage.removeItem('token');
      this.isLogged = false;
    }
}
