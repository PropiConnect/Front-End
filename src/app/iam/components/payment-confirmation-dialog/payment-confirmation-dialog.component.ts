import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment-confirmation-dialog',
  standalone: true,
  template: `
    <div class="dialog-container">
      <div class="icon-container">
        
      </div>
      <h2>Pago realizado con éxito</h2>
      <button mat-raised-button color="primary" (click)="closeDialog()">Continuar</button>
    </div>
  `,
  styles: [`
    .dialog-container {
      text-align: center;
      padding: 20px;
    }
    .icon-container {
      margin-bottom: 20px;
    }
    .success-icon {
      width: 100px;
    }
    h2 {
      color: #4CAF50;
      margin-bottom: 20px;
    }
    button {
      width: 100%;
    }
  `],
  imports: [MatButtonModule]
})
export class PaymentConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<PaymentConfirmationDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
