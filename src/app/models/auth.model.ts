
export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegistroRequest {
  usuario: string;
  password: string;
  nombre: string;
  correo: string | null;
  tipoUsuarioId: number;
}
