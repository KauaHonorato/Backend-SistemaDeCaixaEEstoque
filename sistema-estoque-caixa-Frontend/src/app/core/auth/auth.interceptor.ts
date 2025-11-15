// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = this.auth.getAuthorizationHeader();

    if (authHeader) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
