import { NgModule } from '@angular/core';
import { BLANK_ROUTES } from './blank.routes';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
//Componente principal
import { BlankComponent } from './blank.component';
//Componentes
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './404/not-found.component';
import { SweetAlert } from 'sweetalert/typings/core';

@NgModule({
  imports: [
    BLANK_ROUTES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    BlankComponent,
    LockComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    
  ],
  exports: [
    LockComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent
  ], providers:[
  ]
})
export class BlankModule { }
