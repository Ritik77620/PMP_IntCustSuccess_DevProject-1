// services/project.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Project, Client, Milestone, MasterProject, ProjectStats } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'https://your-api-url.com/api';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      catchError(() => of([]))
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`).pipe(
      catchError(() => of([]))
    );
  }

  getMilestones(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(`${this.apiUrl}/milestones`).pipe(
      catchError(() => of([]))
    );
  }

  getMasterProjects(): Observable<MasterProject[]> {
    return this.http.get<MasterProject[]>(`${this.apiUrl}/master-projects`).pipe(
      catchError(() => of([]))
    );
  }

  createProject(project: Omit<Project, '_id'>): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project);
  }

  updateProject(id: string, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, project);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
  }
}