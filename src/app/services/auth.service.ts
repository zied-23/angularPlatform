import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  catchError,
  pipe,
  tap,
  throwError,
  BehaviorSubject,
  map,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };
  private loggedIn = false;
  private usernameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private rolesSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  constructor(private http: HttpClient) {}

  signin(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };

    return this.http
      .post(`${this.apiUrl}/api/auth/signin`, loginRequest, {
        ...this.httpOptions,
        observe: 'response',
      })
      .pipe(
        tap((response: any) => {
          if (response.body.accessToken && response.body.username) {
            localStorage.setItem('token', response.body.accessToken);
            this.updateAuthorizationHeader();
            this.getUsernameFromToken();
            this.getRolesFromToken();
          }
        })
      );
  }
  private updateAuthorizationHeader(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpOptions.headers = this.httpOptions.headers.set(
        'Authorization',
        `Bearer ${token}`
      );
    } else {
      this.httpOptions.headers =
        this.httpOptions.headers.delete('Authorization');
    }
  }

  signup(
    username: string,
    email: string,
    password: string,
    phone: string,
    fullname: string,
    role: string
  ): Observable<any> {
    const signupData = {
      username,
      email,
      password,
      phone,
      fullname,
      roles: [role],
    };

    return this.http
      .post(`${this.apiUrl}/api/auth/signup`, signupData)
      .pipe(tap(() => (this.loggedIn = true)));
  }

  private removeTokenFromCookies(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  logout(): Promise<void> {
    this.removeTokenFromCookies();

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.loggedIn = false;
    this.usernameSubject.next('');
    return this.http
      .post(`${this.apiUrl}/api/auth/signout`, {}, this.httpOptions)
      .toPromise()
      .then(() => {})
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }
  private updateUsernameSubject(username: string): void {
    this.usernameSubject.next(username);
    localStorage.setItem('username', username);
  }
  private clearUsernameSubject(): void {
    this.usernameSubject.next('');
  }
  getUsernameFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.sub;
      console.log('Fetched username:', username);
      this.updateUsernameSubject(username);
    } else {
      console.log('No token found');
      this.clearUsernameSubject();
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      console.log('Stored username:', storedUsername);
      this.updateUsernameSubject(storedUsername);
    }
  }
  hasRole(role: string): boolean {
    const rolesString = localStorage.getItem('roles');
    if (rolesString) {
      const roles: string[] = JSON.parse(rolesString);
      return roles.includes(role);
    }
    return false;
  }
  hasAnyRole(roles: string[]): boolean {
    const rolesString = localStorage.getItem('roles');

    if (rolesString) {
      const userRoles: string[] = JSON.parse(rolesString);
      console.log('roles provided2' + userRoles);
      return roles.some((role) => userRoles.includes(role));
    }
    return false;
  }
  private updateRolesSubject(roles: string[]): void {
    this.rolesSubject.next(roles);
    localStorage.setItem('roles', JSON.stringify(roles));
    console.log('roles please : ' + roles);
  }

  private getRolesFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.roles;
      console.log('Decoded roles:', roles);
      this.updateRolesSubject(roles);
    } else {
      console.log('No token found');
      this.clearRolesSubject();
    }
  }

  private clearRolesSubject(): void {
    this.rolesSubject.next([]);
    localStorage.removeItem('roles');
  }
}
