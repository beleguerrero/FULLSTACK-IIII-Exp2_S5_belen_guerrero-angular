import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { ForoModel } from '../../models/foro.model';
import { ComentarioModel } from '../../models/comentario.model';
import { ForoService } from '../../services/foro-service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule, Navbar, Footer],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {
  private route = inject(ActivatedRoute);
  private foroService = inject(ForoService);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  // Estado
  foro = signal<ForoModel | null>(null);
  comentarios = signal<ComentarioModel[]>([]);
  nuevoComentario = signal('');

  cargando = signal(true);
  cargandoComentarios = signal(true);

  // Comentarios raíz con sus respuestas anidadas (derivado de `comentarios`)
  comentariosPrincipales = computed<ComentarioModel[]>(() => {
    // Copias, para no mutar los objetos originales
    const copias = this.comentarios().map(c => ({ ...c, respuestas: [] as ComentarioModel[] }));
    const mapa = new Map<number, ComentarioModel>(copias.map(c => [c.id, c]));

    const principales: ComentarioModel[] = [];

    for (const comentario of copias) {
      const padreId = comentario.comentarioPadre?.id;

      if (padreId && mapa.has(padreId)) {
        mapa.get(padreId)!.respuestas!.push(comentario);
      } else {
        principales.push(comentario);
      }
    }

    return principales;
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const id = Number(params.get('id'));

        if (!id || isNaN(id)) {
          this.cargando.set(false);
          return;
        }

        this.cargarDetalle(id);
      });
  }

  cargarDetalle(id: number): void {
    this.cargando.set(true);

    this.foroService.getForoById(id).subscribe({
      next: (data) => {
        this.foro.set(data);
        this.cargando.set(false);
        this.cargarComentarios(id);
      },
      error: () => {
        this.foro.set(null);
        this.cargando.set(false);
      }
    });
  }

  cargarComentarios(foroId: number): void {
    this.cargandoComentarios.set(true);

    this.foroService.getComentarios(foroId).subscribe({
      next: (data) => {
        this.comentarios.set(data);
        this.cargandoComentarios.set(false);
      },
      error: () => {
        this.cargandoComentarios.set(false);
      }
    });
  }

  publicarComentario(contenido: string, comentarioPadreId: number | null = null): void {
    const foro = this.foro();
    const texto = contenido.trim();

    if (!foro || !texto) {
      return;
    }

    this.foroService.doComentario(foro.id, {
      contenido: texto,
      comentarioPadreId
    }).subscribe({
      next: () => {
        if (comentarioPadreId === null) {
          this.nuevoComentario.set('');
        }
        this.cargarComentarios(foro.id);
      },
      error: (err) => {
        console.error('Error al publicar comentario:', err);
      }
    });
  }
}