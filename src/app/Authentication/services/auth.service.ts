import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

export interface SignUpResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface LoginResponseData extends SignUpResponseData {
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly signUpUrl = `${environment.firebase.apiInitial}signUp?key=${environment.firebase.apiKey}`;
  private static readonly loginUrl = `${environment.firebase.apiInitial}signInWithPassword?key=${environment.firebase.apiKey}`;
  user = new BehaviorSubject<User>(null);
  profileInfo = new BehaviorSubject({
    displayName: '',
    email: '',
    imageUrl: '',
  });

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<SignUpResponseData | HttpErrorResponse>(AuthService.signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError<any, any>(this.handleError),
        tap((responseData: SignUpResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponseData | HttpErrorResponse>(AuthService.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError<any, any>(this.handleError),
        tap((responseData: LoginResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
          localStorage.setItem('currentUser', JSON.stringify(responseData));
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.getUserData(loadedUser.token);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const tokenExpirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, userId, token, tokenExpirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.getUserData(user.token);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  updateUserProfile(data: any) {
    return this.http
      .post<any>(
        `${environment.firebase.apiInitial}update?key=${environment.firebase.apiKey}`,
        {
          idToken: data.token,
          displayName: data.name,
          photoUrl: data.picture,
          returnSecureToken: true,
        }
      )
      .pipe(catchError<any, any>(this.handleError));
  }

  getUserData(token: any) {
    return this.http
      .post<any>(
        `${environment.firebase.apiInitial}lookup?key=${environment.firebase.apiKey}`,
        {
          idToken: JSON.parse(localStorage.getItem('userData'))._token,
        }
      )
      .subscribe((res) => {
        this.profileInfo.next({
          displayName: res.users[0].displayName,
          email: res.users[0].email,
          imageUrl: res.users[0].photoUrl,
        });
      });
  }
}
