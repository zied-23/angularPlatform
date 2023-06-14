import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };
  registerStudent(student: any): Observable<any> {
    console.log('JWT token:', this.token);
    return this.http.post(`${this.apiUrl}/students`, student, this.httpOptions);
  }

  registerCoach(coach: any): Observable<any> {
    console.log('JWT token:', this.token);
    return this.http.post(`${this.apiUrl}/coaches`, coach, this.httpOptions);
  }
}
