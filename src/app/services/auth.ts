import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private base = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.base}/login`, data);
  }
  register(data: any) {
    return this.http.post<any>(`${this.base}/register`, data);
  }

  saveAuth(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get user() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
  role() {
    return this.user?.role;
  }
  loginWithFirebase(data: any) {
    return this.http.post<any>(`${this.base}/firebase-login`, data);
  }
}
