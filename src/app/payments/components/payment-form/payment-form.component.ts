import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentConfirmationDialogComponent } from "../payment-confirmation-dialog/payment-confirmation-dialog.component";
import { ToolbarComponent } from "../../../public/pages/toolbar/toolbar.component"; // Importamos MatDialog
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
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
  ]
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  property: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private route: ActivatedRoute // Inyección para manejar parámetros dinámicos de la URL
  ) {
    // Inicializamos el formulario con un solo participante
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      participants: this.fb.array([this.createParticipant()])
    });
  }

  ngOnInit(): void {
    // Cargar los detalles de la propiedad desde el API
    this.loadProperty();
  }

  createParticipant(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      ownershipPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get participants(): FormArray {
    return this.paymentForm.get('participants') as FormArray;
  }

  addParticipant(): void {
    this.participants.push(this.createParticipant());
  }

  removeParticipant(index: number): void {
    if (this.participants.length > 1) {
      this.participants.removeAt(index);
    }
  }

  loadProperty(): void {
    const propertyId = this.route.snapshot.paramMap.get('Id'); // Asegúrate de usar 'Id' con mayúscula
    console.log('Received Property Id:', propertyId); // Log para confirmar el ID

    if (propertyId) {
      this.http
        .get<any>(`https://inmoshare-api-production.up.railway.app/api/v1/properties/${propertyId}`)
        .subscribe(
          (data) => {
            this.property = data;
            console.log('Property loaded:', this.property);
          },
          (error) => {
            console.error('Error fetching property details', error);
          }
        );
    } else {
      console.error('No property Id found in the route');
    }
  }

  // Abrir el diálogo de confirmación de pago exitoso
  openSuccessDialog(): void {
    this.dialog.open(PaymentConfirmationDialogComponent, {
      width: '400px'
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);

      // Simular el envío de los datos
      this.http
        .post('https://inmoshare-api-production.up.railway.app/api/v1/payments', this.paymentForm.value)
        .subscribe({
          next: (response) => {
            console.log('Pago registrado con éxito', response);
            // Abrir el diálogo de confirmación
            this.openSuccessDialog();
          },
          error: (error) => {
            console.error('Error registrando el pago', error);
          }
        });
    }
  }
}
