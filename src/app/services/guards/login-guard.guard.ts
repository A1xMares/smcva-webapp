import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate(){
    if ( this._usuarioService.estaLogueado() ) {
      return true;
    } else {
      this._usuarioService.logout();
      swal('Atención', 'Sesión cerrada por precaución', 'warning' );
      return false;
    }
  }
}
