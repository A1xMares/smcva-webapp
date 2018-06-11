import { Auto } from './../../../models/autos.model';
import { Component, OnInit } from '@angular/core';
import { AutosService, UsuarioService } from '../../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html'
})
export class AutosComponent implements OnInit {
  total: number;
  vacio: boolean = false;
  autos: Auto[] = [];
  constructor(public _autosService: AutosService, public _usuarioService: UsuarioService,public router: Router) { }

  ngOnInit() {
    this.cargarAutos();
  }
  cargarAutos() {
    this._autosService.cargarAutos()
            .subscribe( autos => {
              this.autos = autos.sistemaAutos
              this.total = autos.sistemaAutos.length;
              if(this.total === 0){
                this.vacio = true;
              } else {
                this.vacio = false;
              }
            });
  }
  verDetalles(id:string){
    this.router.navigate(['/detalles/'+ id]);
  }

  buscarAuto(termino:string){
    if ( termino.length <= 0 ) {
      this.cargarAutos();
      return;
    }
    this._autosService.buscarAutos( termino)
            .subscribe( (autos: Auto[]) => {
              this.autos = autos;
              this.total = autos.length;
              if(this.total === 0){
                this.vacio = true;
              } else {
                this.vacio = false;
              }
            });
  }
}
