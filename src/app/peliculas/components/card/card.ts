import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Pelicula } from "../../interfaces/peli-interface";
import { FavoritasService } from '../../services/favoritas-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'peliculas-peli-card',
  templateUrl: './card.html',
  styles: ``,
  standalone: false
})

export class CardComponent implements OnInit {
  @Input() pelicula!: Pelicula;
  @Output() onEliminarFav = new EventEmitter<number>();

  esFavorita: boolean = false;

  constructor(private favoritaService: FavoritasService, private snackbar: MatSnackBar, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if ( !this.pelicula) throw new Error('La película es requerida para mostrar la tarjeta');
    this.comprobarFavoritos();
  }

  comprobarFavoritos() {
    this.favoritaService.getFavoritos().subscribe({
      next: (favs) => {
        this.esFavorita = favs.some(f => f.id_pelicula === this.pelicula.id);
        this.cdr.detectChanges();
      }
    });
  }


  ponerFavorito() {
    if(this.esFavorita) {
      this.favoritaService.deleteFavorito(this.pelicula.id).subscribe({
        next: () => {
          this.esFavorita = false;
          this.snackbar.open('Eliminada de favoritos', 'Cerrar', {duration: 2000});
          this.onEliminarFav.emit(this.pelicula.id);
          this.cdr.detectChanges();
        }
      });
    } else {
      this.favoritaService.addFavorito(this.pelicula.id).subscribe({
        next: () => {
          this.esFavorita = true;
          this.snackbar.open('Pelicula añadida a favoritos', 'Cerrar', {duration: 2000});
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.snackbar.open('Error al guardar', 'Cerrar', {duration: 2000});
          this.cdr.detectChanges();
        }
      });
    }
  }
}
