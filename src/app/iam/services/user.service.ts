import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://my-json-server.typicode.com/PropiConnect/Json-placeholder/users'; // URL de la API

  constructor(private http: HttpClient) {}

  registerUser(user: User) : Observable<User>{
    return this.http.post<User>(this.apiUrl, user);
  }

}
