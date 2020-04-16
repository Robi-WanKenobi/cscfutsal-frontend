import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = localStorage.getItem('token');
  baseURL = 'http://localhost:3000'
  admin = `${this.baseURL}/admin/`;
  isLogged: boolean;

  constructor(private http: HttpClient) {
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