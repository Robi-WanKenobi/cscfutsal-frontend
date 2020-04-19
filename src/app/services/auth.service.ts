import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  baseURL: string;
  admin: string;
  isLogged: boolean;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isLogged = true;
    }
    this.baseURL = environment.backURL;
    this.admin = `${this.baseURL}/admin/`;
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
