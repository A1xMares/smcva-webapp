import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inicia-sesion', pathMatch: 'full' },
  { path: '**',  redirectTo: '/inicia-sesion'}
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
