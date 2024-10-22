import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms'; // To use ngModel
import {HttpClient, HttpClientModule} from '@angular/common/http'; // Ensure HttpClientModule is imported
import { PropertiesService} from "../../services/properties.service";
import {Properties} from "../../model/properties.entity";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-create-properties',
  standalone: true, // This component is standalone
  imports: [FormsModule, HttpClientModule], // Ensure FormsModule and HttpClientModule are included
  templateUrl: './create-properties.component.html',
  styleUrls: ['./create-properties.component.css']
})
export class CreatePropertiesComponent implements OnInit, AfterViewInit {

  protected property: Properties;
  protected columsToDisplay: string[] = ['id', 'owner', 'ownerId', 'city', 'type', 'addres', 'description', 'propertyType', 'rentalType', 'image', 'initf'];
  protected editMode: boolean = false;
  protected dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private propertyService: PropertiesService, private http: HttpClient) {
    this.property = new Properties({});
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
