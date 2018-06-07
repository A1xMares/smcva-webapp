import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-lock',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {
    email: string;
    constructor(public router: Router,
        public _usuarioService: UsuarioService) { }

    ngOnInit() { 
        this.email = localStorage.getItem('email') || '';
        if ( this.email.length < 1 ) {
            this.router.navigate(['/inicia-sesion'])
        }
    }

    ingresar( forma: NgForm) {

        if ( forma.invalid ) {
          return;
        }
    
        let usuario = new Usuario(null, this.email, forma.value.password );
    
        this._usuarioService.login( usuario, forma.value.recuerdame )
                      .subscribe( correcto => this.router.navigate(['/inicio'])  );   
    }

    borrarEmail(){
        localStorage.removeItem('email');
        this.router.navigate(['/inicia-sesion'])
    }
}
