import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navBarData } from './nav-data-ad';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-adsidnav',
  templateUrl: './adsidnav.component.html',
  styleUrls: ['./adsidnav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AdsidnavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  constructor(public authService: AuthService, private router: Router) {
    this.getUsername();
  }

  collapsed = false;
  screenWidth = 0;
  navData = navBarData;
  username: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getUsername();
  }
  getUsername(): void {
    this.username = localStorage.getItem('username') || '';
  }
  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        console.error('Logout error:', error);
      });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
