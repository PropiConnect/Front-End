import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://inmoshare-api-production.up.railway.app/api/v1/users';

  constructor() {}

  registerUser(user: User): Promise<User> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }
        return response.json();
      });
  }

  authenticateUser(email: string, password: string): Promise<{ userId: number, username: string }> {
    const url = `${this.apiUrl}/authenticate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Credenciales incorrectas');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('userId', String(data.userId));
        return {
          userId: Number(data.userId),
          username: data.username
        };
      });
  }

  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

  getUserById(userId: number): Promise<User | null> {
    return fetch(`${this.apiUrl}/${userId}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
        return null;
      });

  }

}
