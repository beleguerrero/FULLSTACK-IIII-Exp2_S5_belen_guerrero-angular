import { UsuarioModel } from "./usuario.model";


export interface ForoModel {
    id: number;
    titulo: string;
    contenido: string;
    fecha: string;
    fecha_actualizacion: string | null;
    usuario: string;
    estado: string;
    categoria: string;
}

export interface EstadoForoModel {
    id: number;
    nombre: string;
    // activo: number;
}

export interface CategoriaModel {
    id: number;
    nombre: string;
    // activo: number;
}
