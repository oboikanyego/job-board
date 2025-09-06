import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Common } from './common';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  commonService = inject(Common);
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
  getToken():string{
    const token = localStorage.getItem('token') || "";
    return token;
  }

  isLoggedIn(): boolean {
    this.commonService.IsUserSignedIn = false;

    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const { exp }: any = jwtDecode(token);
      if (!exp) return false;

      const stillValid = Date.now() < exp * 1000;
      this.commonService.IsUserSignedIn = stillValid;
      return stillValid;
    } catch {
      return false; // invalid token
    }
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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
