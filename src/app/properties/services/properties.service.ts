import {Injectable} from '@angular/core';
import {BaseServiceService} from "../../shared/services/base.service.service";
import {Properties} from "../model/properties.entity";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService extends BaseServiceService<Properties> {

  constructor() {
    super();
    this.resourceEndPoint= '/properties'
  }
}
