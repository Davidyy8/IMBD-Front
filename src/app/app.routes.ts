import { authGuard } from './guard/auth-guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    // Cargamos el módulo de autenticación (que contiene tu login)
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'peliculas',
    canActivate: [authGuard],
    loadChildren: () => import('./peliculas/peliculas-module').then(m => m.PeliculasModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '404',
    loadChildren: () => import('./shared/pages/error404-page/error404-page').then(m => m.Error404PageComponent)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
