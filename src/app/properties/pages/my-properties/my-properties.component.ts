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
import {MatDialogModule} from "@angular/material/dialog";
import {ToolbarComponent} from "../../../public/pages/toolbar/toolbar.component";
import {PropertiesService} from "../../services/properties.service"; // Asegúrate de ajustar la ruta según tu estructura de proyecto

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
    MatDialogModule,
    ToolbarComponent,
    // Asegurarse de importar MatDialogModule aquí
  ],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css',
  providers: [PropertiesService]
})
export class MyPropertiesComponent {
  userProperties: Properties[] = [];
  userId: number = 0; // Asumimos que el ID del usuario es 1, cámbialo por la lógica de autenticación que uses

  constructor(private propertiesService: PropertiesService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProperties();
  }

  // Cargar las propiedades del usuario
  loadUserProperties(): void {
    this.userId = Number(localStorage.getItem('userId')); // Obtener userId del localStorage

    if (!this.userId) {
      console.error('No se encontró el userId en localStorage');
      return;
    }

    this.propertiesService.getPropertiesByOwnerId(this.userId)
      .then(properties => {
        this.userProperties = properties;
        console.log('Propiedades cargadas:', this.userProperties);
      })
      .catch(error => {
        console.error('Error al cargar las propiedades del usuario', error);
      });
  }

  editProperty(propertyId: number): void {
    this.router.navigate(['/properties-managment'], { queryParams: { id: propertyId } });
  }

  // Redirigir a la página para añadir una nueva propiedad
  addProperty(): void {
    this.router.navigate(['/create-properties-management']);
  }

  deleteProperty(propertyId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
      this.propertiesService.deleteProperty(propertyId)
        .then(() => {
          console.log(`Propiedad con ID ${propertyId} eliminada correctamente.`);
          this.userProperties = this.userProperties.filter(property => property.id !== propertyId);
        })
        .catch(error => {
          console.error(`Error al eliminar la propiedad con ID ${propertyId}:`, error);
        });
    }
  }




}

