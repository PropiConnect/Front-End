import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://my-json-server.typicode.com/PropiConnect/Json-placeholder/users'; // URL de la API simulada

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


  loginUser(email: string, password: string): Promise<User | null> {
    return fetch(this.apiUrl)
      .then(response => response.json())
      .then((users: User[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        return user || null;
      })
      .catch(error => {
        console.error('Error al buscar el usuario:', error);
        return null;
      });
  }



  getUserById(userId: string): Promise<User | null> {
    return fetch(`${this.apiUrl}/${userId}`) // Asegúrate de que la ruta sea correcta
      .then(response => response.json())
      .then((user: User) => user) // Verifica que el usuario se reciba correctamente
      .catch(error => {
        console.error('Error al obtener el usuario:', error); // Revisa posibles errores
        return null;
      });
  }



}
