import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { RegistroRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiUrl = `${environment.apiUsuarios}/mi-foro/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/${id}`);
  }

  doUsuario(data: RegistroRequest): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(this.apiUrl, data);
  }

  setUsuario(id: number, data: Partial<RegistroRequest>): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/${id}`, data);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
