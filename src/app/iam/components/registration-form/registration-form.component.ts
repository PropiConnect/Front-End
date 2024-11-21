import { FormsModule } from '@angular/forms';
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { MatOption, MatSelect } from "@angular/material/select";
import { Router, RouterLink } from "@angular/router";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from "@ngx-translate/core";
import {LanguageSwitcherComponent} from "../../../public/components/language-switcher/language-switcher.component";

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
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatIconButton,
    TranslateModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})



export class RegistrationFormComponent {
  name: string = '';
  username: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  userType: string = 'FREE'; // Valor predeterminado

  hide = signal(true);

  constructor(private userService: UserService, private router: Router) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

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
