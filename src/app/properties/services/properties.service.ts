import {Injectable} from '@angular/core';
import {BaseServiceService} from "../../shared/services/base.service.service";
import {Properties} from "../model/properties.entity";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private apiUrl = 'https://inmoshare-api-production.up.railway.app/api/v1/properties';

  constructor() {}

  addProperty(property: Properties): Promise<Properties> {

    const ownerId = Number(localStorage.getItem('userId'));
    const ownerName = localStorage.getItem('username');

    if (!ownerId || !ownerName) {
      console.error('Error: ownerId o ownerName no están disponibles');
      return Promise.reject(new Error('No se pudo obtener la información del propietario'));
    }

    const payload = { ...property, ownerId, ownerName };
    console.log('Payload enviado al backend:', payload); // Verifica el contenido del payload

    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al añadir la propiedad');
        }
        return response.json();
      });
  }

  getPropertiesByOwnerId(ownerId: number): Promise<Properties[]> {
    const apiUrl = `https://inmoshare-api-production.up.railway.app/api/v1/properties/owner/${ownerId}`;
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las propiedades del propietario');
        }
        return response.json();
      });
  }

  deleteProperty(propertyId: number): Promise<void> {

    return fetch(this.apiUrl, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar la propiedad');
        }
      })
      .catch(error => {
        console.error(`Error al intentar eliminar la propiedad con ID ${propertyId}:`, error);
        throw error;
      });
  }



}
