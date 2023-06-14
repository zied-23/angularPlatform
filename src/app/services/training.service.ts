import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Training } from '../models/training.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private apiUrl = 'http://localhost:8080/api/trainings'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  createTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(this.apiUrl, training);
  }

  getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.apiUrl);
  }

  getTrainingById(id: string): Observable<Training> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Training>(url);
  }

  updateTraining(id: string, training: Training): Observable<Training> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Training>(url, training);
  }

  deleteTraining(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
