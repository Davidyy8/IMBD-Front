import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page';
import { MaterialModule } from '../material/material-module';
import { PeliculasRoutingModule } from '../peliculas/peliculas-routing-module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    Error404PageComponent
  ],
  exports: [
    Error404PageComponent
  ],
    imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class SharedModule { }
