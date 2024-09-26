export class Properties {
  "id": number
  "owner": string
  "ownerId": number
  "city": string
  "type": string
  "address":string
  "description": string
  "propertyType": string
  "rentalType": string
  "image": string
  "initialPrice": number

  constructor(properties: {
    id?: number;
    owner?: string;
    ownerId?: number;
    city?: string;
    type?: string;
    address?: string;
    description?: string;
    propertyType?: string;
    rentalType?: string;
    image?: string;
    initialPrice?: number;
  }) {
    this.id = properties.id || 0;
    this.owner = properties.owner || '';
    this.ownerId = properties.ownerId || 0;
    this.city = properties.city || '';
    this.type = properties.type || '';
    this.address = properties.address || '';
    this.description = properties.description || '';
    this.propertyType = properties.propertyType || '';
    this.rentalType = properties.rentalType || '';
    this.image = properties.image || '';
    this.initialPrice = properties.initialPrice || 0;
  }

}
