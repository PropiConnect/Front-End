import {Component} from '@angular/core';
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {RegistrationFormComponent} from "../../components/registration-form/registration-form.component";
import {MatToolbar} from "@angular/material/toolbar";
import {LanguageSwitcherComponent} from "../../../public/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegistrationFormComponent,
    MatToolbar,
    LanguageSwitcherComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
