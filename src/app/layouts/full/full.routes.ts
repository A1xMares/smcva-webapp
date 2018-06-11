import { DetallesComponent } from './../../layouts/full/detalles/detalles.component';
import { AgregarAutoComponent } from './agregar-auto/agregar-auto.component';
import { LoginGuardGuard } from './../../services/service.index';
import { RouterModule, Routes } from '@angular/router';

import { FullComponent } from './full.component';

import { AutosComponent } from './autos/autos.component';
import { ConfigComponent } from './config/config.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { InicioComponent } from './inicio/inicio.component';

const fullRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'inicio', component: InicioComponent, data: {titulo: 'Inicio'} },
            { path: 'mis-autos', component: AutosComponent, data: {titulo: 'Mis autos'}  },
            { path: 'configuracion', component: ConfigComponent, data: {titulo: 'Configuración'}  },
            { path: 'ayuda', component: AyudaComponent, data: {titulo: 'Ayuda'}  },
            { path: 'mi-cuenta', component: CuentaComponent, data: {titulo: 'Mi cuenta'}  },
            { path: 'detalles/:id', component: DetallesComponent, data: {titulo: 'Detalles'}  },
            { path: 'agregar-auto', component: AgregarAutoComponent, data: {titulo: 'Agregar auto'}  },
            { path: '', redirectTo: '/inicia-sesion', pathMatch: 'full' }
        ]
    }
];


export const FULL_ROUTES = RouterModule.forChild( fullRoutes );
