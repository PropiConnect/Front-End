import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PropertiesService } from '../../services/properties.service';
import {Properties} from "../../model/properties.entity";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatCardContent} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ToolbarComponent} from "../../../public/pages/toolbar/toolbar.component";


@Component({
  selector: 'app-update-properties',
  standalone: true,
  templateUrl: './update-properties.component.html',
  imports: [
    CurrencyPipe,
    MatCardContent,
    FormsModule,
    MatButton,
    NgIf,
    ToolbarComponent
  ],
  styleUrls: ['./update-properties.component.css']
})
export class UpdatePropertiesComponent implements OnInit {
  property: Properties | null = null;
  isEditing: boolean = false; // Inicia en modo edición

  constructor(private route: ActivatedRoute, private propertiesService: PropertiesService, private router: Router) {}

  ngOnInit(): void {
    const propertyId = Number(this.route.snapshot.paramMap.get('Id'));
    console.log('ID de la propiedad capturado:', propertyId);

    if (propertyId) {
      this.propertiesService.getPropertyById(propertyId)
        .then(property => {
          this.property = property;
          console.log('Propiedad cargada:', this.property);
        })
        .catch(error => {
          console.error('Error al cargar la propiedad:', error);
        });
    } else {
      console.error('No se encontró un ID válido en la URL');
    }
  }


  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.property && this.property.Id) {
      this.propertiesService.updatePropertyById(this.property.Id, this.property).then(updatedProperty => {
        this.property = updatedProperty;
        this.isEditing = false;
        console.log('Propiedad actualizada correctamente');
      }).catch(error => {
        console.error('Error al actualizar la propiedad:', error);
      });
      this.router.navigate(['/properties'])
    }
  }


}
