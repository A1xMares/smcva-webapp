import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import { NgForm } from '@angular/forms';
//declare const gapi: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    recuerdame: boolean = false;
    logeado: string;
    //auth2: any;
    constructor(public router: Router,
        public _usuarioService: UsuarioService) {}

    ngOnInit() { 
       // this.googleInit();
        this.logeado = localStorage.getItem('token') || '';
        this.email = localStorage.getItem('email') || '';
        if ( this.email.length > 1 ) {
          this.router.navigate(['/lock']);
        }
        if ( this.logeado.length > 1 ) {
          this.router.navigate(['/inicio']);
        }
        $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
        $('#to-login').on("click", function() {
            $("#loginform").fadeIn();
            $("#recoverform").slideUp();
        });
        
    }

    /*googleInit() {

        gapi.load('auth2', () => {
    
          this.auth2 = gapi.auth2.init({
            client_id: '442737206823-dilej5tevnrv61sovd7bocf5qeafmjs3.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email'
          });
    
          this.attachSignin( document.getElementById('btnGoogle') );
    
        });
    
      }*/

      /*attachSignin( element ) {

        this.auth2.attachClickHandler( element, {}, (googleUser) => {
    
          // let profile = googleUser.getBasicProfile();
          let token = googleUser.getAuthResponse().id_token;
    
          this._usuarioService.loginGoogle( token )
                  .subscribe( () => window.location.href = '#/inicio'  );
    
        });
    
      }*/

      ingresar( forma: NgForm) {

        if ( forma.invalid ) {
          return;
        }
    
        let usuario = new Usuario(null, forma.value.email, forma.value.password );
    
        this._usuarioService.login( usuario, forma.value.recuerdame )
                      .subscribe( correcto => this.router.navigate(['/inicio'])  );   
      }

}
