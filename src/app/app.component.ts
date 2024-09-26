import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {RegistrationFormComponent} from "./iam/components/registration-form/registration-form.component";
import {LoginFormComponent} from "./iam/components/login-form/login-form.component";
import {PaymentFormComponent} from "./payments/components/payment-form/payment-form.component";
import {PaymentRecordsComponent} from "./payments/pages/payment-records/payment-records.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationFormComponent, LoginFormComponent, PaymentFormComponent, PaymentRecordsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PropiConect-FrontEnd';
}
