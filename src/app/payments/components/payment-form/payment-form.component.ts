import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentConfirmationDialogComponent } from "../payment-confirmation-dialog/payment-confirmation-dialog.component";
import { ToolbarComponent } from "../../../public/pages/toolbar/toolbar.component";
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../../iam/services/user.service";
import { User } from "../../../iam/models/user.model";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-payment-form',
  standalone: true,
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToolbarComponent,
    TranslateModule,
  ]
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  property: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      participants: this.fb.array([this.createParticipant()])
    });
  }

  ngOnInit(): void {
    this.loadProperty();
    this.prefillUserData();
    this.listenToParticipantChanges();
  }

  createParticipant(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentPercentage: [100, [Validators.required, Validators.min(0), Validators.max(100)]],
      ownershipPercentage: [100, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get participants(): FormArray {
    return this.paymentForm.get('participants') as FormArray;
  }

  addParticipant(): void {
    const newParticipant = this.createParticipant();
    this.participants.push(newParticipant);
    this.adjustPercentagesOnInput();
  }

  removeParticipant(index: number): void {
    if (this.participants.length > 1) {
      this.participants.removeAt(index);
      this.adjustPercentagesOnInput();
    }
  }

  loadProperty(): void {
    const propertyId = this.route.snapshot.paramMap.get('Id');
    if (propertyId) {
      this.http
        .get<any>(`https://inmoshare-api-production.up.railway.app/api/v1/properties/${propertyId}`)
        .subscribe(
          (data) => {
            this.property = data;
          },
          (error) => {
            console.error('Error fetching property details', error);
          }
        );
    } else {
      console.error('No property Id found in the route');
    }
  }

  prefillUserData(): void {
    const userId = this.userService.getCurrentUserId();
    if (!userId) {
      console.error('No user logged in');
      return;
    }

    this.userService.getUserById(userId).then((user: User | null) => {
      if (user) {
        const participantForm = this.participants.at(0);
        participantForm.patchValue({
          name: user.name,
          email: user.email,
        });
      }
    });
  }

  adjustPercentagesOnInput(): void {
    const totalParticipants = this.participants.length;

    if (totalParticipants === 1) {
      // Si hay solo un participante, su porcentaje de pago y propiedad debe ser 100%
      this.participants.at(0).get('paymentPercentage')?.setValue(100, { emitEvent: false });
      this.participants.at(0).get('ownershipPercentage')?.setValue(100, { emitEvent: false });
      return;
    }

    // Calcular el porcentaje total ya asignado excepto el primer participante
    let totalPaymentUsed = 0;
    let totalOwnershipUsed = 0;

    this.participants.controls.slice(1).forEach(participant => {
      const paymentPercentage = participant.get('paymentPercentage')?.value || 0;
      const ownershipPercentage = participant.get('ownershipPercentage')?.value || 0;
      totalPaymentUsed += paymentPercentage;
      totalOwnershipUsed += ownershipPercentage;
    });

    // Calcular el porcentaje restante para el primer participante
    const remainingPayment = 100 - totalPaymentUsed;
    const remainingOwnership = 100 - totalOwnershipUsed;

    if (remainingPayment < 0 || remainingOwnership < 0) {
      console.warn('El total de los porcentajes excede el 100%. Ajusta manualmente.');
      return;
    }

    // Asignar los valores restantes al primer participante
    const firstParticipant = this.participants.at(0);
    const currentFirstPayment = firstParticipant.get('paymentPercentage')?.value || 0;
    const currentFirstOwnership = firstParticipant.get('ownershipPercentage')?.value || 0;

    if (currentFirstPayment !== remainingPayment) {
      firstParticipant.get('paymentPercentage')?.setValue(remainingPayment, { emitEvent: false });
    }
    if (currentFirstOwnership !== remainingOwnership) {
      firstParticipant.get('ownershipPercentage')?.setValue(remainingOwnership, { emitEvent: false });
    }

    // Asegurar que los nuevos participantes inicien con 0 en ambos porcentajes
    this.participants.controls.slice(1).forEach((participant, index) => {
      const currentPayment = participant.get('paymentPercentage')?.value;
      const currentOwnership = participant.get('ownershipPercentage')?.value;

      if (currentPayment === 100 && index === totalParticipants - 2) {
        participant.get('paymentPercentage')?.setValue(0, { emitEvent: false });
      }
      if (currentOwnership === 100 && index === totalParticipants - 2) {
        participant.get('ownershipPercentage')?.setValue(0, { emitEvent: false });
      }
    });
  }







  // Escuchar cambios en los formularios
  listenToParticipantChanges(): void {
    this.participants.valueChanges.subscribe(() => {
      this.adjustPercentagesOnInput();
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(PaymentConfirmationDialogComponent, {
      width: '400px'
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.http
        .post('https://inmoshare-api-production.up.railway.app/api/v1/payments', this.paymentForm.value)
        .subscribe({
          next: () => this.openSuccessDialog(),
          error: (error) => console.error('Error registrando el pago', error),
        });
    }
  }
}
