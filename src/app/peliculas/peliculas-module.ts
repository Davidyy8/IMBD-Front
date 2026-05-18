import { NgModule } from "@angular/core";
import { CardComponent } from "./components/card/card";
import { LayoutPageComponent } from "./pages/layout-page/layout-page";
import { ListPageComponent } from "./pages/list-page/list-page";
import { CommonModule } from "@angular/common";
import { PeliculasRoutingModule } from "./peliculas-routing-module";
import { MaterialModule } from "../material/material-module";
import { PeliculaDetalleComponent } from "./pages/peli-page/peli-page";
import { ListFavsComponent } from "./pages/favorite-page/favorito-peli";


@NgModule({
  declarations: [
    CardComponent,
    LayoutPageComponent,
    ListPageComponent,
    PeliculaDetalleComponent,
    ListFavsComponent
  ],

  imports: [
    CommonModule,
    PeliculasRoutingModule,
    MaterialModule,
  ]
})

export class PeliculasModule { }
