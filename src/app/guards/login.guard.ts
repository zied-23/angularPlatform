import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      if (this.authService.hasAnyRole(['ROLE_ADMIN'])) {
        return this.router.parseUrl('/dashboard');
      } else if (
        this.authService.hasAnyRole(['ROLE_STUDENT']) ||
        this.authService.hasAnyRole(['ROLE_COACH'])
      ) {
        return this.router.parseUrl('/home');
      }
    }
    return true;
  }
}
