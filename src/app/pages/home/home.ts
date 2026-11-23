import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { ForoModel } from '../../models/foro.model';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { MdlNuevoForo } from '../../components/mdl-nuevo-foro/mdl-nuevo-foro';
import { ForoService } from '../../services/foro-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MdlNuevoForo,
    DatePipe,
    RouterLink,
    FormsModule,
    Navbar,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  foros: ForoModel[] = [];
  categorias: any[] = [];
  categoriaSeleccionada: string | null = null;

  ordenSeleccionado = 'recientes';

  cargando: boolean = true;

  constructor(
    private foroService: ForoService,
  ) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.cargarForos();
    }
  }

  cargarForos(): void {
    this.cargando = true;

    this.foroService.getForos().subscribe({
      next: (data) => {
        this.foros = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los foros:', error);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  get forosFiltrados(): ForoModel[] {
    let resultado = [...this.foros];

    if (this.categoriaSeleccionada !== null) {
      resultado = resultado.filter(
        foro => foro.categoria === this.categoriaSeleccionada
      );
    }

    if (this.ordenSeleccionado === 'recientes') {
      resultado.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    }

    if (this.ordenSeleccionado === 'antiguos') {
      resultado.sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );
    }

    return resultado;
  }


  get forosFiltrados_(): ForoModel[] {

    let resultado = [...this.foros];

    if(this.categoriaSeleccionada !== null) {
      resultado = resultado.filter(
        foro => foro.categoria === this.categoriaSeleccionada
      );
    }

    if(this.ordenSeleccionado === 'recientes') {
      resultado.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    }

    if(this.ordenSeleccionado === 'antiguos') {
      resultado.sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );
    }

    return resultado;

  }

  seleccionarCategoria(nombre: string | null): void {
    this.categoriaSeleccionada = nombre;
  }
}
