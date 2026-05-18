import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Favorita } from "../interfaces/fav-interface";


@Injectable({
  providedIn: 'root'
})

export class FavoritasService {
  private baseUrl = 'http://localhost:8000'
  constructor( private http: HttpClient ) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token_sesion');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getFavoritos(): Observable<Favorita[]> {
    const idUsuario = localStorage.getItem('id')
    return this.http.get<Favorita[]>(`${this.baseUrl}/favoritas/${idUsuario}`,  { headers: this.getHeaders() });
  }

  addFavorito(idPelicula: number): Observable<Favorita> {
    const idUsuario = localStorage.getItem('id');

    const body = {
      id_pelicula: idPelicula,
      id_usuario: Number(idUsuario)
    }

    return this.http.post<Favorita>(`${this.baseUrl}/favoritas`, body, { headers: this.getHeaders() });
  }

  deleteFavorito(idPelicula: number): Observable<Favorita> {
    const idUsuario = localStorage.getItem('id');
    return this.http.delete<Favorita>(`${this.baseUrl}/favoritas/${idUsuario}/${idPelicula}`, { headers: this.getHeaders() });
  }
}
