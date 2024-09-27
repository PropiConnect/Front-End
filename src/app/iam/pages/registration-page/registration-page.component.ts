import {Component} from '@angular/core';
import {RegistrationFormComponent} from "../../components/registration-form/registration-form.component";
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    RegistrationFormComponent,
    LoginFormComponent,
    NgOptimizedImage
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {}
