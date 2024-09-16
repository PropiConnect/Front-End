import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {RegistrationFormComponent} from "./iam/components/registration-form/registration-form.component";
import {LoginFormComponent} from "./iam/components/login-form/login-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationFormComponent, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PropiConect-FrontEnd';
}
