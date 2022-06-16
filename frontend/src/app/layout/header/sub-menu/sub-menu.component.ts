import { Component, OnInit } from '@angular/core';
import { MenuItem } from "../menu/menu-item";
import { MENU_CONFIG } from "../menu/menu.config";
import { SubMenuItem } from "./sub-menu-config/sub-menu.item";
import { SUB_MENU_CONFIG } from "./sub-menu-config/sub-menu.config";
import { filter } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  submenu: SubMenuItem[] = SUB_MENU_CONFIG;
  currentRoute: string = '/ars-manager';
  baseRoute: string = '/ars-manager';

  constructor(private router: Router) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  ngOnInit(): void {
  }

  trackBy(index: number, item: MenuItem): string {
    return item.id;
  }
}
