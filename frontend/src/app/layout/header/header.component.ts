import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MENU_CONFIG } from "./menu/menu.config";
import { MenuItem } from "./menu/menu-item";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menu: MenuItem[] = MENU_CONFIG;
  currentRoute: string = '/';

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
