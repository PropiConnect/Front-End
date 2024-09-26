import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

import {RegistrationFormComponent} from "./iam/components/registration-form/registration-form.component";
import {LoginFormComponent} from "./iam/components/login-form/login-form.component";
import {PaymentFormComponent} from "./payments/components/payment-form/payment-form.component";
import {MatAnchor, MatButton, MatIconAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {LoginPageComponent} from "./iam/pages/login-page/login-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationFormComponent, LoginFormComponent, PaymentFormComponent, MatButton, MatIconAnchor, MatIcon, MatAnchor, RouterLink, MatToolbar, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PropiConect-FrontEnd';
}
