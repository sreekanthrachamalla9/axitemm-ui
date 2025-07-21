import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // ✅ Make sure this is correct

  constructor(private http: HttpClient) {}

  registerUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getUserById(id: string) {
  return this.http.get<any>(`http://localhost:3000/users/${id}`);
}

updateUser(id: string, data: any) {
  return this.http.put(`http://localhost:3000/users/${id}`, data);
}

}
