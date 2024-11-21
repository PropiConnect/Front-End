import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatAnchor, MatButton, MatIconAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {LoginPageComponent} from "../../../iam/pages/login-page/login-page.component";
import {RegistrationFormComponent} from "../../../iam/components/registration-form/registration-form.component";
import {LoginFormComponent} from "../../../iam/components/login-form/login-form.component";
import {PaymentFormComponent} from "../../../payments/components/payment-form/payment-form.component";
import {UserService} from "../../../iam/services/user.service";
import {LanguageSwitcherComponent} from "../../components/language-switcher/language-switcher.component";


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterOutlet, RegistrationFormComponent, LoginFormComponent, PaymentFormComponent, MatButton, MatIconAnchor, MatIcon, MatAnchor, RouterLink, MatToolbar, LoginPageComponent, LanguageSwitcherComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(private router: Router, private userService: UserService) {}

  navigateToMyAccount() {
    const userId = this.userService.getCurrentUserId();
    if (userId !== null) {
      this.router.navigate(['/profile', userId]);
    } else {
      console.error('El usuario no está autenticado.');
    }
  }
}
