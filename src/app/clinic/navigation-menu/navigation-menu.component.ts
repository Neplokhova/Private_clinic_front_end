import { Component } from '@angular/core';
import {MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatDivider} from "@angular/material/divider";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    MatNavList,
    MatIcon,
    MatSidenav,
    MatSidenavContainer,
    MatDivider
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})

export class NavigationMenuComponent {
  activeMenu: string = '';

  constructor (private router: Router){};

  public navigateToPatientCrud(): void {
    this.activeMenu = 'patients';
    this.router.navigate(['patients']);
  }

  public navigateToDoctorsCrud(): void {
    this.activeMenu = 'doctors';
    this.router.navigate(['doctors']);
  }
  public navigateToServicesCrud(): void {
    this.activeMenu = 'services';
    this.router.navigate(['services']);
  }

  public navigateToNewAppeal(): void {
    this.activeMenu = 'new_appeal';
    this.router.navigate(['new_appeal']);
  }

  public navigateToFinReport(): void {
    this.activeMenu = 'fin_report';
    this.router.navigate(['fin_report']);
  }

}
