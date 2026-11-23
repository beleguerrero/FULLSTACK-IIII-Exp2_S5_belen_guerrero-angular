import { UsuarioModel } from "./usuario.model";

export interface ComentarioModel {
    id: number;
    contenido: string;
    fecha: string;
    fechaActualizacion: string | null;

    comentarioPadre: { id: number; } | null;

    usuario: string;
    foro: { id: number; };

    // activo: number;
    
    respuestas?: ComentarioModel[];
}
