import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../peliculas/services/auth-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/login';

  constructor(private http: HttpClient) { }

  // El método que llamará tu componente de Login al final del paso 2
  login(datos: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, datos).pipe(
      tap(res => {
        // Al recibir la respuesta, guardamos el token automáticamente
        localStorage.setItem('token_sesion', res.token_sesion);
        localStorage.setItem('nombre_usuario', res.nombre_publico);
        console.log('Token guardado en el sistema');
      })
    );
  }


  // Método para salir
  logout() {
    localStorage.removeItem('token_sesion');
    localStorage.removeItem('nombre_usuario');
    localStorage.clear();
  }
}
