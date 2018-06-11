import { Injectable } from '@angular/core';
import { Auto } from '../../models/autos.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { SubirArchivoService } from '../subirArchivo/subirArchivo.service';
const swal: SweetAlert = _swal as any;
@Injectable()
export class AutosService {

  auto: Auto;
  token: string;
  detalles: string;
  autos: any;
  id: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { this.cargarStorage();}

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
    } else {
      this.token = '';
      this.id = null;
    }
  }

  cargarDetalles(id: string) {
    this.cargarStorage();
    let url = URL_SERVICIOS + '/sistema/' + id + '?token=' + this.token;
    return this.http.get( url )
                .map( (resp: any) => {
                  return resp;
                });
  }

  cargarAutos() {
    let url = URL_SERVICIOS + '/sistema?token=' + this.token;
    return this.http.get( url )
                .map( (resp: any) => {
                  return resp;
                });
  }

  buscarAutos( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/sistemas/' + termino + '?token=' + this.token;
    return this.http.get( url )
                .map( (resp: any) => resp.sistemas );
  }



  cargarHistorial(sistema: string) {
    console.log(sistema);
    let url = URL_SERVICIOS + '/historia/mostrar/' + sistema + '?token=' + this.token;
    return this.http.get( url )
                .map( (resp: any) => {
                  console.log(resp);
                  return resp.historial;
                });
  }

  guardarSistema( auto: Auto ) {
    let url = URL_SERVICIOS + '/sistema';
      // creando
      url += '?token=' + this.token;
      return this.http.post( url, auto )
              .map( (resp: any) => {
                swal('Auto registrado', auto.apodo, 'success');
                return resp.sistema;
              });
  }

  cambiarImagen( archivo: File, id: string ) {
    return this._subirArchivoService.subirArchivo( archivo, 'sistemas', id )
          .then( (resp: any) => {
            swal( 'Imagen Actualizada', '', 'success' );
            return resp;
          })
          .catch( resp => {
            console.log( resp );
          }) ;
  }

  actualizarSistema( auto: Auto ) {
    let url = URL_SERVICIOS + '/sistema/' + auto._id;
    url += '?token=' + this.token;
    return this.http.put( url, auto )
                .map( (resp: any) => {
                  swal('Auto actualizado con éxito ', ''+ auto.apodo,'success');
                  return true;
                });
  }

  borrarAuto( id: string ) {
    let url = URL_SERVICIOS + '/sistema/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url )
                .map( resp => {
                  swal('Éxito','Auto eliminado con éxito','success');
                  //swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  console.log(resp);
                  return true;
                });
  }
}



