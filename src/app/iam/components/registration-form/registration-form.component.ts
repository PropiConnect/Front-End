import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { MatOption, MatSelect } from "@angular/material/select";
import { Router, RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatAnchor,
    MatIcon,
    RouterLink
  ],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  name: string = '';
  username: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  userType: string = 'FREE'; // Valor predeterminado

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.username || !this.phone || !this.email || !this.password || !this.address) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    const newUser: User = {
      name: this.name,
      username: this.username,
      phone: this.phone,
      email: this.email,
      password: this.password,
      address: this.address,
      userType: this.userType
    };

    this.userService.registerUser(newUser)
      .then((response) => {
        console.log('Usuario registrado:', response);
        alert('Registro exitoso. Redirigiendo a la página de inicio de sesión.');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Error al registrar el usuario. Inténtalo nuevamente.');
      });
  }
}
