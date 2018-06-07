import { Injectable } from '@angular/core';
import { Auto } from '../../models/autos.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class AutosService {

  auto: Auto;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    //public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';

    }
  }


  cargarAutos( auto: Auto ) {

    let url = URL_SERVICIOS + '/sistema?token=' + this.token;
    return this.http.get( url )
                .map( (resp: any) => {

                  console.log(resp);
                  //this.mostrarAutos( resp. );

                  return true;
                });
  }
}
