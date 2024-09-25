export interface User {
  id: string;  // Opcional, porque es generado por la API
  name: string;
  phone: string;
  email: string;
  password: string;
  subscriptionType: string;  // Siempre será "Free"
  address: string;
}
