  import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
  import { Pelicula } from "../../interfaces/peli-interface";
  import { PeliculaService } from "../../services/pelicula-service";


  @Component({
    selector: 'app-list-page',
    templateUrl: './list-page.html',
    styles: ``,
    standalone: false
  })

  export class ListPageComponent implements OnInit{
    public listadoPelis: Pelicula[] = [];

    // Inyectar el servicio
    constructor(private peliculaService: PeliculaService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
      // Cargar peliculas populares al iniciar el componente
      this.peliculaService.obtenerPeliculasPopulares().subscribe(res => {
        this.listadoPelis = res.results;
        this.cdr.detectChanges();
      })
      console.log(this.listadoPelis);
    }

    onBuscar(event: any) {
      const busqueda = event.target.value;
      if (busqueda.length === 0) {
          this.peliculaService.obtenerPeliculasPopulares().subscribe(res => {
            this.listadoPelis = res.results;
          });
          return;
        }

      if (busqueda.length > 2) {
        this.peliculaService.buscarPeliculas(busqueda).subscribe(res => {
          this.listadoPelis = res.results;
        })
      }
    }
  }
