import * as $ from 'jquery';
import { NgModule } from '@angular/core';
import { FULL_ROUTES } from './full.routes';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//Modulo shared
import { SharedModule } from '../../shared/shared.module';
//Componente principal
import { FullComponent } from './full.component';
//Componentes
import { AutosComponent } from './autos/autos.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ConfigComponent } from './config/config.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { InicioComponent } from './inicio/inicio.component';
//
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
//Declaración de constantes
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};
@NgModule({
  imports: [
    PerfectScrollbarModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
    HttpModule,
    FULL_ROUTES,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    FullComponent,
    AutosComponent,
    AyudaComponent,
    ConfigComponent,
    CuentaComponent,
    InicioComponent
  ],
  exports: [
    AutosComponent,
    AyudaComponent,
    ConfigComponent,
    CuentaComponent,
    InicioComponent
  ],
  providers:[
      {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }
  ]
})
export class FullModule { }
