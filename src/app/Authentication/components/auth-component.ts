import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthService,
  LoginResponseData,
  SignUpResponseData,
} from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;
  error: any = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fromBUilder: FormBuilder
  ) {}
  ngOnInit() {
  //   this.authForm = this.fromBUilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     passWord: ['', [Validators.required, Validators.minLength(6)]],
  //   });
  // }
  this.authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable:
      | Observable<LoginResponseData | HttpErrorResponse>
      | Observable<SignUpResponseData | HttpErrorResponse>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe({
      next: (responseData) => {
        this.router.navigate(['/products']);
      },
      error: (errorMessage: string) => {
        this.error = errorMessage;
      },
    });
    this.authForm.reset();
  }
}
