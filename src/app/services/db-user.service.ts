import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbUserService {
  baseUrl = 'https://recipe-book-backend-au6o.onrender.com/api/users';
  constructor(private http: HttpClient) {}
  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getUserByUserName(username: string) {
    return this.http.get(`${this.baseUrl}/${username}`);
  }
  addUser(user: any) {
    return this.http.post(`${this.baseUrl}`, user);
  }
  updateUser(user: any) {
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }
}
