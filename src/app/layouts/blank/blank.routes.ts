import { RouterModule, Routes } from '@angular/router';
//Componente principal
import { BlankComponent } from './blank.component';
//Componentes
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './404/not-found.component';

const blankRoutes: Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [
            { path: 'inicia-sesion', component: LoginComponent, data: {titulo: 'Inicia sesión'} },
            { path: 'registro', component: SignupComponent, data: {titulo: 'Registro'}  },
            { path: 'lock', component: LockComponent, data: {titulo: 'Ingresa'}  },
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: '**', component: NotFoundComponent, data: {titulo: 'Error 404'}  }
        ]
    }
];

export const BLANK_ROUTES = RouterModule.forChild( blankRoutes );
