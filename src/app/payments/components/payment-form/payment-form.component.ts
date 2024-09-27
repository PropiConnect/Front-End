import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http'; // Importar HttpClientModule
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonModule} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {PaymentConfirmationDialogComponent} from "../payment-confirmation-dialog/payment-confirmation-dialog.component"; // Importamos MatDialog


@Component({
  selector: 'app-payment-form',
  standalone: true,
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
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
    MatDialogModule // Asegurarse de importar MatDialogModule aquí
  ]
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  property: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) { // Inyectamos MatDialog en el constructor
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
    // Aquí haces la llamada al API para obtener la información de la propiedad
    this.http.get<any>('https://my-json-server.typicode.com/PropiConnect/Json-placeholder/properties/1').subscribe(
        data => {
          this.property = data;
        },
        error => {
          console.error('Error fetching property details', error);
        }
    );
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
      this.http.post('https://my-json-server.typicode.com/PropiConnect/Json-placeholder/payments', this.paymentForm.value)
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
