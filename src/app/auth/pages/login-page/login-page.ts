import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css'],
  standalone: false
})
export class LoginComponent {
  // Control de vista
  paso: number = 1;
  cargando: boolean = false; // Nueva variable para el estado de espera

  // Datos del formulario
  datosLogin = {
    usuario: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef, // Inyectamos el detector de cambios
    private snackBar: MatSnackBar
  ) {}

  // Validación básica de formato de email
  esEmailValido(): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(this.datosLogin.usuario);
  }

  // Primer paso: Simula la verificación de Cisco
  irAPassword() {
    if (!this.esEmailValido()) {
      this.snackBar.open('Por favor, introduce un correo electrónico válido', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'] // Clase opcional para ponerlo rojo
      });
      return;
    }
    if (this.esEmailValido()) {
      this.cargando = true; // Mostramos el spinner/mensaje de carga
      this.cdr.detectChanges();

      // Simulamos el delay de seguridad de 1.5 segundos
      setTimeout(() => {
        this.cargando = false;
        this.paso = 2;
        this.cdr.detectChanges(); // Forzamos el cambio de vista al paso 2
      }, 1500);
    } else {
      alert('Por favor, introduce un correo válido');
    }
  }

  // Segundo paso: Enviamos todo al Backend
  ejecutarLogin() {
    this.authService.login(this.datosLogin).subscribe({
      next: (res) => {
        localStorage.setItem('token_sesion', res.token_sesion);
        localStorage.setItem('id', String(res.id_usuario));
        this.router.navigate(['/peliculas/listado']);
      },
      error: () => {
        this.snackBar.open('Usuario o contraseña incorrectos', 'Reintentar', { duration: 3000 });
        this.paso = 1;
        this.datosLogin.password = ''; // Limpiamos la clave por seguridad
        this.cdr.detectChanges();
      }
    });
  }
}
