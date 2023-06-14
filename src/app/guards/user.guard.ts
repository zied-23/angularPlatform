import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      if (
        this.authService.hasAnyRole(['ROLE_USER', 'ROLE_COACH']) ||
        this.authService.hasAnyRole(['ROLE_USER', 'ROLE_STUDENT'])
      ) {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
