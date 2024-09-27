import {Injectable} from '@angular/core';
import {BaseServiceService} from "../../shared/services/base.service.service";
import {Payment} from "../model/payment.entity";

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseServiceService<Payment>{

  constructor() {
    super();
    this.resourceEndPoint = '/payments';
  }

}
