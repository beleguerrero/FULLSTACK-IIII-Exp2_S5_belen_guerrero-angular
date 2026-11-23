import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForoModel } from '../models/foro.model';
import { environment } from '../../environments/environment';
import { ComentarioModel } from '../models/comentario.model';

@Injectable({
  providedIn: 'root',
})
export class ForoService {

  private apiUrl = environment.apiForo;

  constructor(
    private http: HttpClient
  ) {}

  getForos(): Observable<ForoModel[]> {
    return this.http.get<ForoModel[]>(`${this.apiUrl}/foros`);
  }


  getForoById(id: number): Observable<ForoModel> {
    return this.http.get<ForoModel>(`${this.apiUrl}/foros/${id}`);
  }

  doForo(data: {
    titulo: string;
    contenido: string;
    estadoId: number;
    categoriaId: number;
  }): Observable<ForoModel> {
    return this.http.post<ForoModel>(`${this.apiUrl}/foros`, data);
  }

  setForo(id: number, data: Partial<{
    titulo: string;
    contenido: string;
    estadoId: number;
    categoriaId: number;
    activo: number;
  }>): Observable<ForoModel> {
    return this.http.put<ForoModel>(`${this.apiUrl}/foros/${id}`, data);
  }

  deleterForo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/foros/${id}`);
  }


  // 
  // 
  // 


  getComentarios(foroId: number): Observable<ComentarioModel[]> {
    return this.http.get<ComentarioModel[]>(`${this.apiUrl}/foros/${foroId}/comentarios`);
  }


  doComentario(
    foroId: number,
    data: {
      contenido: string;
      comentarioPadreId: number | null;
    }
  ): Observable<ComentarioModel> {
    return this.http.post<ComentarioModel>(`${this.apiUrl}/foros/${foroId}/comentarios`, data);
  }


  setComentario(
    id: number,
    data: Partial<{
      contenido: string;
      activo: boolean;
    }>
  ): Observable<ComentarioModel> {
    return this.http.put<ComentarioModel>(`${this.apiUrl}/comentarios/${id}`, data);
  }


  deleteComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comentarios/${id}`);
  }

}
