import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Authentication/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('container') Container: any;
  Form: FormGroup;
  editMode: boolean = false;
  profileInfo: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  token = JSON.parse(localStorage.getItem('userData'))._token;
  ngOnInit() {
    this.Form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', Validators.email],
      picture: ['', [Validators.required]],
    });
    this.authService.profileInfo.subscribe((res) => {
      this.profileInfo = res;
      this.Form.setValue({
        name: res.displayName,
        email: res.email,
        picture: res.imageUrl,
      });
    });
  }

  onEdit() {
    this.editMode = !this.editMode;
  }

  onSubmit() {
    if (this.Form.valid) {
      const uData = {
        token: this.token,
        ...this.Form.value,
      };
      this.authService.updateUserProfile(uData).subscribe({
        next: (res) => {
          this.authService.getUserData(uData.token);
          this.editMode = false;
          this.router.navigate(['/products']);
        },
        error: (err) => console.log(err),
      });
    }
  }

  onCancel() {
    this.router.navigate(['/profile'], { queryParams: null });
  }
}
