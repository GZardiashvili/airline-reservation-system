import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { MENU_CONFIG } from "./menu/menu.config";
import { MenuItem } from "./menu/menu-item";
import { Profile } from "./models/profile";
import { AuthService } from "../../auth/services/auth.service";
import { User } from "../../register/user";
import { Observable, Subject } from "rxjs";
import { UserService } from "./services/user.service";
import { faUser, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material/dialog";
import { UserDialogComponent } from "./user-dialog/user-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  user: Observable<User> = this.userService.getUserProfile();
  menu: MenuItem[] = MENU_CONFIG;
  notSignIn: boolean = true;
  currentRoute: string = '/';
  faUser = faUser;

  profile: Profile = {
    sign: {
      in: 'Sign In',
      up: 'Sign Up',
    },
    pfpUrl: '',
    account: {
      label: 'Account settings',
      url: '',
    },
    bookings: {
      label: 'My bookings',
      url: '',
    },
    ArsManager: {
      id: 'ars-manager',
      label: 'ARS Manager',
      url: '/ars-manager',
      permission: 'admin',
    },
    logout: 'Log out',
  };

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private dialog: MatDialog) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
    this.user.pipe(takeUntil(this.componentIsDestroyed$)).subscribe((user) => {
      this.profile.sign.in = user.firstName + ' ' + user.lastName;
      this.notSignIn = false;
      this.profile.pfpUrl =
        user.pfpUrl == '' ? user.pfpUrl : '../../../assets/default-pfp.png';
      this.profile.account.url = '/account';
      this.profile.bookings.url = '/booked-flights';
    });
  }

  openDialog() {
    this.dialog.open(UserDialogComponent);
  }

  role!: string | null;

  logout() {
    this.authService.logout();
  }

  trackBy(index: number, item: MenuItem): string {
    return item.id;
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
