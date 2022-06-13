import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MENU_CONFIG } from "./menu/menu.config";
import { MenuItem } from "./menu/menu-item";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menu: MenuItem[] = MENU_CONFIG;
  currentRoute: string = '/';
  faUser: IconProp = faUser;
  user: any = {
    name: 'John Doe',
    pfp: faUser,
  };

  constructor(private router: Router) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });

  }

  trackBy(index: number, item: MenuItem): string {
    return item.id;
  }

}
