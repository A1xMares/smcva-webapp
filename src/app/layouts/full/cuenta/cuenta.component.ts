import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/service.index';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  private modalRef: NgbModalRef;
  formc: FormGroup;
  formd: FormGroup;
  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService, private modalService: NgbModal) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    this.formc = new FormGroup({
      password: new FormControl( null , Validators.required ),
      password2: new FormControl( null , Validators.required )
    }, {validators: this.sonIguales('password', 'password2')});

    this.formd = new FormGroup({
      password: new FormControl( null , Validators.required )
    });

    $('#to-editar').on("click", function() {
      $("#divcuenta").slideUp();
      $("#diveditar").fadeIn();
    });
    $('#to-cancelar').on("click", function() {
        $("#divcuenta").fadeIn();
        $("#diveditar").slideUp();
    });

    $(window).resize(function(){
      var windowWidth = $(window).width();
      console.log(windowWidth);
      if(windowWidth < 477){
        $(".responsive-buttons-1").html('<i class="ti-pencil"></i>&nbsp;');
        $(".responsive-buttons-2").html('<i class="ti-close"></i>&nbsp;');
        $(".responsive-buttons-3").html('<i class="ti-save"></i>&nbsp;');
      } else {
        $(".responsive-buttons-1").html('<i class="ti-pencil"></i>&nbsp;Contraseña');
        $(".responsive-buttons-2").html('<i class="ti-close"></i>&nbsp;Cancelar');
        $(".responsive-buttons-3").html('<i class="ti-save"></i>&nbsp;Guardar');
      }
    });
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
  guardar( usuario: Usuario ) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this._usuarioService.actualizarUsuario( this.usuario )
                .subscribe( resp => {
                  $("#divcuenta").fadeIn();
                  $("#diveditar").slideUp();
                });
  }
  contrasena( usuario: Usuario ) {
    this.usuario.password = this.formc.value.password;
    this._usuarioService.actualizarContrasena( this.usuario )
                .subscribe( resp => {
                  this.formc.reset();
                  $(".close").click();
                });
  }
  eliminar(formd: NgForm){
    if ( this.formd.invalid ) {
      return;
    }
    let recuerdame = localStorage.getItem('email') || false;
    if (recuerdame != false ){
      recuerdame = true;
    }
    let usuario = new Usuario(null, this.usuario.email, this.formd.value.password );
    this._usuarioService.login( usuario, recuerdame )
                  .subscribe( correcto => {
                    this._usuarioService.borrarUsuario( this.usuario._id )
                    .subscribe( correcto => {
                      this.formd.reset();
                      localStorage.removeItem('email');
                      this._usuarioService.logout();
                      $(".close").click();
                    });
                  });
  }
  open2(elimina) { 
    this.modalService.open(elimina).result.then((result) => {
      this.formd.reset();
    }, (reason) => {
      this.formd.reset();
    });
  }
  open(content){ 
    this.modalService.open(content).result.then((result) => {
      this.formc.reset();
    }, (reason) => {
      this.formc.reset();
    });
  }
  /*open2(elimina){ 
    this.modalRef = this.modalService.open(elimina);
    this.modalRef.result.then();
  }*/
}
