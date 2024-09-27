export class Participant {
  name: string;
  email:string;
  paymentPercentage:number;
  ownershipPercentage:number;

constructor(participant:{name?: string, email?: string, paymentPercentage?: number, ownershipPercentage?: number}) {
  this.name = participant.name || '';
  this.email = participant.email || '';
  this.paymentPercentage = participant.paymentPercentage || 0;
  this.ownershipPercentage = participant.ownershipPercentage || 0;
}
}
