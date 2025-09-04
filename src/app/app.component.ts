import { Component } from '@angular/core';
import {RouterOutlet, NavigationEnd, Router} from '@angular/router';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {filter} from "rxjs";
import {NavigationMenuComponent} from "./clinic/navigation-menu/navigation-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterOutlet, NavigationMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //showSidebar = true;

  constructor(private router: Router) {
    this.router.events
      .subscribe(event => {
      });
  }
}
