import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Properties} from "../../model/properties.entity";
import {PropertiesService} from "../../services/properties.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatCard, MatCardContent} from "@angular/material/card";


@Component({
  selector: 'app-properties-management',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    MatDivider,
    MatCardContent,
    MatCard
  ],
  templateUrl: './properties-management.component.html',
  styleUrl: './properties-management.component.css'
})
export class PropertiesManagementComponent implements OnInit {
  //#region Attributes

  protected propertyData!: Properties;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private propertyService: PropertiesService = inject(PropertiesService);
  property: any;
  //#endregion

  //#region Methods

  //#region begin
  constructor() {
    this.editMode = false;
    this.propertyData = new Properties({});
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit():void {
    //get la data de courses
    this.getAllProperties();
  }
  //#endregion

  //#region CRUD
  private getAllProperties() {
    this.http.get<any>('https://my-json-server.typicode.com/PropiConnect/Json-placeholder/properties/1').subscribe(
      data => {
        this.property = data;
      },
      error => {
        console.error('Error fetching property details', error);
      }
    );
  }


  //#endregion

  //#endregion
}
