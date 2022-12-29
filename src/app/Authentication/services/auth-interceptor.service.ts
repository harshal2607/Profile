import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const authRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(authRequest);
      })
    );
  }
}
