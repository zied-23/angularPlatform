import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-us-dashboard',
  templateUrl: './us-dashboard.component.html',
  styleUrls: ['./us-dashboard.component.scss'],
})
export class UsDashboardComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    } else if (!this.collapsed && this.screenWidth <= 768) {
      styleClass = 'body-full-screen';
    } else {
      styleClass = 'body-default';
    }
    return styleClass;
  }
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isSideNavCollapsed = false;
  constructor(public responsive: BreakpointObserver, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login'; // Set the login page route here
      }
    });
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRegisterPage = event.url === '/register'; // Set the login page route here
      }
    });
  }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  ngOnInit() {
    this.responsive
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log(
            'This is the Handset Portrait point at max-width: 599.98 px and portrait orientation.'
          );
        }
      });
  }
}
