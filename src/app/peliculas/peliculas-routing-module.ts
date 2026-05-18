import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page';
import { ListPageComponent } from './pages/list-page/list-page';
import { PeliculaDetalleComponent } from './pages/peli-page/peli-page';
import { ListFavsComponent } from './pages/favorite-page/favorito-peli';

// Componentes


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'listado', component: ListPageComponent },
      { path: 'pelicula-detalle/:id', component: PeliculaDetalleComponent },
      { path: 'favoritas', component: ListFavsComponent },
      { path: '', redirectTo: 'listado', pathMatch: 'full' },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule {}
