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
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
    display: {
      label: 'Display settings',
      url: '',
    },
    logout: 'Log out',
  };

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
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
      this.profile.display.url = '/display';
    });
  }

  logout() {
    this.authService.logout();
  }

  trackBy(index: number, item: MenuItem): string {
    return item.id;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
