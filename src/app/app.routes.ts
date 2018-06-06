import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const appRoutes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '**',  redirectTo: '/404'}
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
