import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Properties } from '../../../properties/model/properties.entity';
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { ToolbarComponent } from "../toolbar/toolbar.component"; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-my-properties',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, // Asegurarse de importar HttpClientModule aquí
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToolbarComponent,
    RouterLink,
  ],
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'] // Corrección: `styleUrls` en lugar de `styleUrl`
})
export class HomeComponent {
  userProperties: Properties[] = [];
  userId: number = 1; // Cambia esto por la lógica para obtener el ID del usuario autenticado

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProperties();
  }

  // Cargar las propiedades del usuario
  loadUserProperties(): void {
    this.http.get<any[]>(`https://inmoshare-api-production.up.railway.app/api/v1/properties`)
      .subscribe(
        data => {
          // Mapeamos 'Id' del backend a 'id' de la clase Properties
          this.userProperties = data.map(item => ({
            ...item,
            id: item.Id // Renombramos 'Id' a 'id'
          }));
          console.log('Mapped Properties loaded:', this.userProperties);
        },
        error => {
          console.error('Error al cargar las propiedades del usuario', error);
        }
      );
  }



  // Método para redirigir a la página de pago con parámetros dinámicos
  buyProperty(propertyId: number): void {
    console.log('Redirecting to payment for property Id:', propertyId); // Log de depuración
    if (propertyId) {
      this.router.navigate([`/payment/${propertyId}`]); // Redirección usando el ID dinámico
    } else {
      console.error('Property Id is undefined');
    }
  }


}

