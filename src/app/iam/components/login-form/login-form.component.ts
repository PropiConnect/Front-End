import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInputModule,
    NgIf,
    MatButton
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Nueva propiedad para manejar el mensaje de error

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.errorMessage = '';  // Resetea el mensaje de error al iniciar el submit

    // Llama al méto do loginUser del servicio para verificar si el usuario existe
    this.userService.loginUser(this.email, this.password)
      .then(user => {
        if (user) {
          console.log('Usuario encontrado:', user);
          this.router.navigate(['/profile', user.id]); // Navega al perfil con el ID del usuario
        } else {
          this.errorMessage = 'Correo electrónico o contraseña incorrectos.'; // Mensaje de error
          console.log('Usuario no encontrado o credenciales incorrectas.');
        }
      })
      .catch(error => {
        console.error('Error en el proceso de login:', error);
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
