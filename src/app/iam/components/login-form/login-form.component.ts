import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Agrega esto si usas matInput
import {Router} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";


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

  constructor(private router: Router) {}

  onSubmit() {
    console.log(this.email);
    console.log(this.password);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }

}
