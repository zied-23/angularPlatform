import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach, Student } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };

  registerStudent(signUpRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, signUpRequest);
  }

  registerCoach(signUpRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/coaches`, signUpRequest);
  }

  getAllCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/users/roles/ROLE_COACH`);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/users/roles/ROLE_STUDENT`);
  }

  updateStudent(id: string, updateRequest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/students/${id}`, updateRequest);
  }

  updateCoach(id: string, updateRequest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/coaches/${id}`, updateRequest);
  }

  removeStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${id}`);
  }

  removeCoach(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/coaches/${id}`);
  }
}
