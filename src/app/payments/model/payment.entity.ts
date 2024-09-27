import {Participant} from "./participant.entity";

export class Payment {
 id: number;
 cardNumber: string;
 participants: Participant[];

 constructor(payment:{id?: number, cardNumber?: string, participants?: Participant[]}) {
   this.id = payment.id || 0;
   this.cardNumber = payment.cardNumber || '';
   this.participants = payment.participants || [];
 }
}
