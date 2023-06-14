import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly apiUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };
  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }
  createGroup(group: any): Observable<any> {
    console.log('JWT token:', this.token);

    return this.http.post(`${this.apiUrl}`, group, this.httpOptions);
  }

  getGroupByName(name: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${name}`);
  }

  addUserToGroup(groupId: string, userId: string): Observable<any> {
    const url = `${this.apiUrl}/${groupId}/users/${userId}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  removeUserFromGroup(groupId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${groupId}/users/${userId}`);
  }

  getGroupsByTraining(trainingId: string): Observable<Group[]> {
    const url = `${this.apiUrl}?trainingId=${trainingId}`;
    return this.http.get<Group[]>(url);
  }
  getGroupById(id: string): Observable<Group> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Group>(url);
  }
}
