import {Routes} from '@angular/router';
import {RegistrationPageComponent} from "./iam/pages/registration-page/registration-page.component";
import {LoginPageComponent} from "./iam/pages/login-page/login-page.component";
import {PaymentFormComponent} from "./payments/components/payment-form/payment-form.component";
import {PaymentRecordsComponent} from "./payments/pages/payment-records/payment-records.component";
import {CardProfileComponent} from "./iam/components/card-profile/card-profile.component";
import {MyPropertiesComponent} from "./properties/pages/my-properties/my-properties.component";
import {PropertiesManagementComponent} from "./properties/pages/properties-management/properties-management.component"
import {CreatePropertiesComponent} from "./properties/pages/create-properties/create-properties.component";
import {HomeComponent} from "./public/pages/home/home.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile/:id', component: CardProfileComponent },
  { path: 'home', component: HomeComponent } ,
  { path: 'payment', component: PaymentFormComponent },
  { path: 'owner/payments', component: PaymentRecordsComponent },

  { path: 'properties', component: MyPropertiesComponent },
  { path: 'all-properties', component: PropertiesManagementComponent},
  { path: 'create-properties-management', component: CreatePropertiesComponent }
];
