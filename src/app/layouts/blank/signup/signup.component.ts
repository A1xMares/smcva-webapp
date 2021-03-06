import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    forma: FormGroup;
    constructor(public _usuarioService: UsuarioService,
        public router: Router) { }
    
    resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
    }

    sonIguales( campo1: string, campo2: string ) {
        return ( group: FormGroup ) => {
          let pass1 = group.controls[campo1].value;
          let pass2 = group.controls[campo2].value;
          if ( pass1 === pass2 ) {
            return null;
          }
          return {
            sonIguales: true
          };
        };
      }

    ngOnInit() { 
        this.forma = new FormGroup({
            nombre: new FormControl( null , Validators.required ),
            correo: new FormControl( null , [Validators.required, Validators.email] ),
            password: new FormControl( null , Validators.required ),
            password2: new FormControl( null , Validators.required ),
            condiciones: new FormControl( false ),
            captcha: new FormControl(false)
          }, {validators: this.sonIguales('password', 'password2')});
    }

    registrarUsuario() {
        if ( this.forma.invalid ) {
          return;
        }
        if ( !this.forma.value.condiciones ) {
          swal('Importante','Debe aceptar las condiciones','warning');
          return;
        }
        if ( !this.forma.value.captcha ) {
          swal('Importante','Debe completar el re-captcha','warning');
          return;
        }
        let usuario = new Usuario(
          this.forma.value.nombre,
          this.forma.value.correo,
          this.forma.value.password
        );
        this._usuarioService.crearUsuario( usuario )
                  .subscribe( resp => this.router.navigate(['/inicia-sesion']));
      }
}
