import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Pelicula } from '../../interfaces/peli-interface';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PeliculaService } from "../../services/pelicula-service";
import { MaterialModule } from "../../../material/material-module";
import { CommonModule } from "@angular/common";
import { FavoritasService } from "../../services/favoritas-service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-pelicula-detalle',
  templateUrl: 'peli-page.html',
  styleUrl: 'peli-page.css',
  standalone: false
})

export class PeliculaDetalleComponent implements OnInit {
  pelicula: any;
  public esFavorita: boolean = false;


  constructor (private route: ActivatedRoute, private peliculaService: PeliculaService, private favoritaService: FavoritasService, public snackbar: MatSnackBar, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id  = Number(this.route.snapshot.paramMap.get('id'));

    this.peliculaService.obtenerDetallesPelicula(id).subscribe({
      next: (res) => {
        console.log('La pelicula es: ', res),
        this.pelicula = res,
        console.log('La pelicula es 2: ', this.pelicula),
        this.comprobarFavoritos(id);
        this.cdr.detectChanges();
      }
    });


  }

    comprobarFavoritos(id: number) {
    this.favoritaService.getFavoritos().subscribe({
      next: (favs) => {
        this.esFavorita = favs.some(f => f.id_pelicula === id);
        this.cdr.detectChanges();
      }
    });
  }

ponerFavorito() {
    if (this.esFavorita) {
      this.favoritaService.deleteFavorito(this.pelicula.id).subscribe(() => {
        this.esFavorita = false;
        this.snackbar.open('Eliminada de favoritos', 'Cerrar', { duration: 2000 });
        this.cdr.detectChanges();
      });
    } else {
      this.favoritaService.addFavorito(this.pelicula.id).subscribe(() => {
        this.esFavorita = true;
        this.snackbar.open('Añadida a favoritos', 'Cerrar', { duration: 2000 });
        this.cdr.detectChanges();
      });
    }
  }
}
