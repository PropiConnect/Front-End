import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment.service';
import {Payment} from '../../model/payment.entity';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCard, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar"; // Import MatTableModule
import {CommonModule} from '@angular/common'; // Import CommonModule
@Component({
  selector: 'app-payment-records',
  standalone: true,
  imports: [
    HttpClientModule, // Ensure HttpClientModule is imported
    MatTableModule, // Import MatTableModule
    MatSort,
    MatPaginator,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatToolbar,
    CommonModule
  ],
  providers: [PaymentService], // Ensure PaymentService is provided
  templateUrl: './payment-records.component.html',
  styleUrls: ['./payment-records.component.css']
})
export class PaymentRecordsComponent implements OnInit {
  //protected paymentData!: Payment;
  //protected columnsToDisplay: string[] = ["id", "amount"];
  //protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<Payment>;
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  private paymentService: PaymentService = inject(PaymentService);

  constructor() {
    this.dataSource = new MatTableDataSource<Payment>();
  }

  ngOnInit(): void {
    this.getAllPayments();
  }

  private getAllPayments() {
    this.paymentService.getAll().subscribe((response: Array<Payment>) => {
      this.dataSource.data = response;
      console.log(response);
    });
  }
}
