import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private baseUrl = 'http://localhost:8080/api/sessions';

  constructor(private http: HttpClient) {}

  getAllSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.baseUrl);
  }

  getSessionById(id: string): Observable<Session> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Session>(url);
  }

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.baseUrl, session);
  }

  deleteSession(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getSessionsByDate(date: Date): Observable<Session[]> {
    const url = `${this.baseUrl}/date/${date}`;
    return this.http.get<Session[]>(url);
  }
}
