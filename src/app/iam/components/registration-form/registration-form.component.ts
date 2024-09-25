import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    HttpClientModule
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  subscriptionType: string = '';

  constructor() {}


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


  }
}
