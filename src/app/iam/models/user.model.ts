export interface User {
  id?: number; // Este es el alias que usarás en tu frontend
  userId?: number; // Esto refleja el nombre exacto del campo en el backend
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  userType: string;
}

