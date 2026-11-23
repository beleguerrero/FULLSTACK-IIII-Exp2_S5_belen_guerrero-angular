import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaModel } from '../../models/foro.model';
import { ForoService } from '../../services/foro-service';

@Component({
  selector: 'app-mdl-nuevo-foro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mdl-nuevo-foro.html',
  styleUrl: './mdl-nuevo-foro.css',
})
export class MdlNuevoForo {

  @Output() publicado = new EventEmitter<void>();

  titulo = '';
  contenido = '';
  categoriaId: number | null = null;
  estadoId = 1;
  categorias = [
    { id: 1, nombre: 'Categoría 1' },
    { id: 2, nombre: 'Categoría 2' },
    { id: 3, nombre: 'Categoría 3' },
    { id: 4, nombre: 'Categoría 4' },
  ];

  guardando = false;
  error = '';

  constructor(
    private foroService: ForoService
  ) {}

  
  guardarNuevoForo(): void {
    if(
      !this.titulo.trim() ||
      !this.contenido.trim() ||
      this.categoriaId === null
    ) {
      this.error = 'Completa todos los campos.';
      return;
    }

    this.guardando = true;
    this.error = '';

    const datos = {
      titulo: this.titulo.trim(),
      contenido: this.contenido.trim(),
      estadoId: this.estadoId,
      categoriaId: this.categoriaId
    };

    this.foroService.doForo(datos).subscribe({
      next: () => {
        this.guardando = false;
        this.limpiarFormulario();
        this.publicado.emit();

        const modal = document.getElementById('mdlNuevoForo');

        if(modal) {
          const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
          bootstrapModal?.hide();
        }

      },

      error: (err) => {
        this.guardando = false;
        this.error = err.error?.message || 'No fue posible publicar el tema.';
      }
    });
  }

  limpiarFormulario(): void {

    this.titulo = '';
    this.contenido = '';
    this.categoriaId = null;

    this.error = '';

  }


}
