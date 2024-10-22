import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { PropertiesService} from "../../services/properties.service";
import {Payment} from "../../../payments/model/payment.entity";
import {Properties} from "../../model/properties.entity";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-create-properties',
  standalone: true, // Este componente es standalone
  imports: [FormsModule, HttpClientModule], // Asegúrate de incluir FormsModule y HttpClientModule
  templateUrl: './create-properties.component.html',
  styleUrls: ['./create-properties.component.css']
})
export class CreatePropertiesComponent implements OnInit, AfterViewInit {

 protected propertisData! : Properties;
 protected columsToDisplay: string[] = ['id' , 'owner', 'ownerId', 'city', 'type', 'addres','description','propertyType','rentalType','image','initf'];
protected editMode: boolean = false;
protected dataSource: MatTableDataSource<any>;


}
