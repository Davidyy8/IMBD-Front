import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { forkJoin, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { PeliculaService } from "../../services/pelicula-service";
import { FavoritasService } from "../../services/favoritas-service";

@Component({
  selector: 'app-list-favoritas',
  templateUrl: 'favorito-peli.html',
  styleUrl: 'favorito-page.css',
  standalone: false,
})
export class ListFavsComponent implements OnInit {
  public listadoFavoritas: any[] = [];

  constructor(
    private peliculaService: PeliculaService,
    private favoritasService: FavoritasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  /**
   * Recibe el ID desde el Output de la Card y actualiza la lista local
   */
  eliminarDeLaVista(idParaBorrar: number) {
    // Filtramos el array: creamos uno nuevo sin la película borrada
    this.listadoFavoritas = this.listadoFavoritas.filter(peli => peli.id !== idParaBorrar);

    // Forzamos la detección de cambios para que la tarjeta desaparezca YA
    this.cdr.detectChanges();
  }

  cargarFavoritos() {
    this.favoritasService.getFavoritos().pipe(
      switchMap(favs => {
        if (!favs || favs.length === 0) return of([]);

        // Mapeamos cada favorito a una petición de detalle en TMDB
        const peticiones = favs.map(f => this.peliculaService.obtenerDetallesPelicula(f.id_pelicula));

        // forkJoin lanza todas las peticiones y espera a que terminen
        return forkJoin(peticiones);
      })
    ).subscribe({
      next: (detalles) => {
        this.listadoFavoritas = detalles;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al recuperar detalles de favoritas', err)
    });
  }
}
