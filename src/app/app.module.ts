//Importaciones necesarias (Generales)
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Rutas
import { APP_ROUTES } from './app.routes';
//Modulos
import { FullModule } from './layouts/full/full.module';
import { BlankModule } from './layouts/blank/blank.module';

//Componente
import { AppComponent } from './app.component';
//Providers
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES,
    FullModule,
    BlankModule,
    ServiceModule
  ],
  providers: [
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
