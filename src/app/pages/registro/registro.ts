import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { RegistroRequest } from '../../models/auth.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  nombre = '';
  usuario = '';
  correo = '';
  password = '';
  confirmarPassword = '';

  cargando = false;
  mensajeError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(): void {
    this.mensajeError = '';

    if (this.password !== this.confirmarPassword) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    const datos: RegistroRequest = {
      nombre: this.nombre,
      usuario: this.usuario,
      correo: this.correo,
      password: this.password,
      tipoUsuarioId: 2
    };

    this.cargando = true;

    this.authService.registrar(datos).subscribe({
      next: () => {
        alert('Usuario registrado correctamente.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);

        this.mensajeError =
          error.error?.message ||
          'No fue posible completar el registro.';

        this.cargando = false;
      }
    });
  }

}
