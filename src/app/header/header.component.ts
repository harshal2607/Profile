import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../services/app.service';
import { AuthService } from '../Authentication/services/auth.service';
import { User } from '../Authentication/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {
  value: any;
  responseData: any;
  isAuthenticated = false;
  profileInfo: any;
  imageSource: any;
  private userSub!: Subscription;
  count: number = 0;
  constructor(
    private authService: AuthService,
    private appService: AppService
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
    this.authService.profileInfo.subscribe((res) => {
      this.profileInfo = res;
    });
    this.appService.fetchAllData().subscribe((data: any) => {
      this.responseData = data;
    });
  }
  ngDoCheck() {
    this.count = this.appService.count;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
