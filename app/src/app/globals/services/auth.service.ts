// src/app/Service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Backend base URL

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
  }

  // Login user
  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, data);
  }

  // Get dashboard data
  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/dashboard`);
  }

  // Register new user
  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/signup`, data);
  }

  // Delete user by ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/users/${id}`);
  }

  // Get user by ID (for view/edit)
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users/${id}`);
  }

  // Update user by ID (for edit)
  updateUser(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/users/${id}`, data);
  }
  addUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/signup`, data);
  }
  getUserByIds(id: number): Observable<any> {
  return this.http.get<any>(`http://localhost:8080/api/users/${id}`);
}

updateUsers(id: number, userData: any): Observable<any> {
  return this.http.put<any>(`http://localhost:8080/api/users/${id}`, userData);
}

}
