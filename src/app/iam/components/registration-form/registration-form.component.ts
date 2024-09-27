import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  subscriptionType: string = '';

  constructor(private userService: UserService, private router: Router) {} // Inyectar Router

  onSubmit() {
    const newUser: User = {
      id: this.name + '00', // Generar el ID basado en el nombre
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
      subscriptionType: this.subscriptionType,
      address: this.address
    };

    this.userService.registerUser(newUser)
      .then((response) => {
        console.log('Usuario registrado:', response);
        // Puedes redirigir al usuario a otra página después del registro
        this.router.navigate(['/login']); // Por ejemplo, redirigir a la página de inicio de sesión
      })
      .catch((error) => {
        console.error('Error al registrar el usuario:', error);
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
