import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Ticket, Client, NotificationConfig } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = 'https://your-api-url.com/api';

  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  public tickets$ = this.ticketsSubject.asObservable();

  private notificationSubject = new BehaviorSubject<NotificationConfig>({
    show: false,
    message: '',
    type: 'success'
  });
  public notification$ = this.notificationSubject.asObservable();

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/tickets`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  createTicket(ticket: Omit<Ticket, 'id'>): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/tickets`, ticket);
  }

  updateTicket(id: string, ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/tickets/${id}`, ticket);
  }

  deleteTicket(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tickets/${id}`);
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationSubject.next({
      show: true,
      message,
      type
    });

    // Auto hide after 3 seconds
    setTimeout(() => {
      this.hideNotification();
    }, 3000);
  }

  hideNotification() {
    this.notificationSubject.next({
      show: false,
      message: '',
      type: 'success'
    });
  }

  updateTickets(tickets: Ticket[]) {
    this.ticketsSubject.next(tickets);
  }
}