import { H } from "@angular/cdk/keycodes";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TMDBResponse } from "../interfaces/peli-interface";


@Injectable({
  providedIn: 'root'
})

export class PeliculaService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '2341d7ffb4551d5fa39f3bad6e360e06';
  private language = 'es-ES';


  constructor( private http: HttpClient ) { }

  // 1. Buscador de peliculas
  buscarPeliculas( busqueda: string ) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', busqueda)
      .set('language', this.language);

    return this.http.get<TMDBResponse>(`${this.baseUrl}/search/movie`, { params });
  }


  // 2. Detalles de una pelicula
  obtenerDetallesPelicula( id: number ) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.language);

    return this.http.get(`${this.baseUrl}/movie/${id}`, { params });
  }

  // 3. Peliculas populares
  obtenerPeliculasPopulares() {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.language);
    return this.http.get<TMDBResponse>(`${this.baseUrl}/movie/popular`, { params });
  }
}

