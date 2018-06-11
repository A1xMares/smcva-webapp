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
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
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
    BLANK_ROUTES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
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
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es'
    }
  ]
})
export class BlankModule { }
