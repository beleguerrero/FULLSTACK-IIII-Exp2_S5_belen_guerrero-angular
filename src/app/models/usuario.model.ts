

export interface UsuarioModel {
    id: number;
    usuario: string;
    nombre: string;
    correo: string | null;
    tipoUsuario: TipoUsuarioModel;
    fecha: string;
    activo: number;
}

export interface TipoUsuarioModel {
    id: number;
    nombre: string;
    activo: number;
}
