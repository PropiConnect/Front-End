import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PropertiesService } from "../../services/properties.service";
import { Properties } from "../../model/properties.entity";
import { MatTableDataSource } from "@angular/material/table";
import {ToolbarComponent} from "../../../public/pages/toolbar/toolbar.component";

@Component({
  selector: 'app-create-properties',
  standalone: true, // Este componente es standalone
  imports: [
    FormsModule,
    HttpClientModule,
    ToolbarComponent,
    // Usa HttpClientModule para habilitar HttpClient
  ],
  providers: [
    PropertiesService // Asegúrate de registrar el servicio si es necesario
  ],
  templateUrl: './create-properties.component.html',
  styleUrls: ['./create-properties.component.css']
})
export class CreatePropertiesComponent implements OnInit, AfterViewInit {
  protected property: Properties;
  protected columnsToDisplay: string[] = [
    'id',
    'owner',
    'ownerId',
    'city',
    'type',
    'address',
    'description',
    'propertyType',
    'rentalType',
    'image',
    'initialPrice'
  ];
  protected editMode: boolean = false;
  protected dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private propertyService: PropertiesService) {
    this.property = new Properties({});
  }

  ngOnInit() {
    console.log('CreatePropertiesComponent initialized');
  }

  ngAfterViewInit() {
    console.log('View initialized');
  }

  registerProperty(): void {
    // Verificar que localStorage tenga los valores correctos
    const ownerId = Number(localStorage.getItem('userId'));
    const ownerName = localStorage.getItem('username');

    if (!ownerId || !ownerName) {
      console.error('Error: ownerId o ownerName no están disponibles en localStorage');
      alert('No se puede registrar la propiedad: falta información del propietario.');
      return;
    }

    // Asegurarse de incluir ownerId y ownerName al registrar la propiedad
    const propertyWithOwner = { ...this.property, ownerId, ownerName };

    this.propertyService.addProperty(propertyWithOwner)
      .then(newProperty => {
        console.log('Propiedad registrada correctamente:', newProperty);
        alert('Propiedad registrada exitosamente');
        this.property = new Properties({}); // Limpiar el formulario después de registrar
      })
      .catch(error => {
        console.error('Error al registrar la propiedad:', error);
        alert('Ocurrió un error al registrar la propiedad.');
      });
  }



}
