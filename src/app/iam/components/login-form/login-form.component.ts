import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.errorMessage = '';

    this.userService.authenticateUser(this.email, this.password)
      .then(({ userId, username }) => {
        console.log('Usuario autenticado:', userId, username);

        // Guardar en localStorage
        localStorage.setItem('userId', String(userId));
        localStorage.setItem('username', username);

        // Navega a la página de perfil pasando el userId como parámetro
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
        console.error('Error en el proceso de login:', error);
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
