import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usuario = '';
  password = '';

  cargando = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  iniciarSesion(): void {
    if(!this.usuario.trim() || !this.password) {
      this.error = 'Ingresa tu usuario y contraseña.';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.authService.login({
      usuario: this.usuario.trim(),
      password: this.password

    }).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/']);
      },

      error: (err) => {
        this.cargando = false;
        this.error = err.error?.message || 'Usuario o contraseña incorrectos.';
      }
    });
  }

}
