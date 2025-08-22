import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

@Injectable()
export class AuthInterceptor {
  intercept: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next(req);
  }
}
