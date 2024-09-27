import {Component} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {Properties} from '../../model/properties.entity';
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog"; // Asegúrate de ajustar la ruta según tu estructura de proyecto

@Component({
  selector: 'app-my-properties',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,  // Asegurarse de importar HttpClientModule aquí
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule // Asegurarse de importar MatDialogModule aquí
  ],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css'
})
export class MyPropertiesComponent {
  userProperties: Properties[] = [];
  userId: number = 1; // Asumimos que el ID del usuario es 1, cámbialo por la lógica de autenticación que uses

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProperties();
  }

  // Cargar las propiedades del usuario
  loadUserProperties(): void {
    this.http.get<Properties[]>(`https://my-json-server.typicode.com/PropiConnect/Json-placeholder/properties?ownerId=${this.userId}`)
      .subscribe(
        data => {
          this.userProperties = data;
        },
        error => {
          console.error('Error al cargar las propiedades del usuario', error);
        }
      );
  }

  // Redirigir a la página de edición de propiedades
  editProperty(propertyId: number): void {
    this.router.navigate(['/properties-managment'], { queryParams: { id: propertyId } });
  }

  // Redirigir a la página para añadir una nueva propiedad
  addProperty(): void {
    this.router.navigate(['/properties-managment']);
  }
}
