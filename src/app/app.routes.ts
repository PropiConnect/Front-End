import { Routes } from '@angular/router';
import { RegistrationPageComponent } from "./iam/pages/registration-page/registration-page.component";
import { LoginPageComponent } from "./iam/pages/login-page/login-page.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent }
];
