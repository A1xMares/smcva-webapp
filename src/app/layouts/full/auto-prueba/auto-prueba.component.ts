import { Component, OnInit, Input } from '@angular/core';
import { AutosService } from '../../../services/service.index';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Historial } from '../../../models/historial.model';
import { Auto } from '../../../models/autos.model';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-auto-prueba',
  templateUrl: './auto-prueba.component.html',
  styles: []
})
export class AutoPruebaComponent implements OnInit {
  detalles: string;
  historiales: Historial[] = [];
  sistema: Auto;
  imagenSubir: File;
  imagenTemp: string;
  id: string;
  formd: FormGroup;
  modelo: string;
  apodo: string;
  numserie: string;
  constructor(public _autosService: AutosService, public router: Router, public route: ActivatedRoute, private modalService: NgbModal) 
  {}

  seleccionImage( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._autosService.cambiarImagen( this.imagenSubir, this.id );
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.cargarDetalles();
    $('#to-editar').on("click", function() {
      $("#divfoto").slideUp();
      $("#divdetalles").slideUp();
      $("#diveditar").fadeIn();
    });
    $('#to-foto').on("click", function() {
      $("#divfoto").fadeIn();
      $("#divdetalles").slideUp();
      $("#diveditar").slideUp();
    });
    $('.to-detalles').on("click", function() {
      $("#divfoto").slideUp();
      $("#divdetalles").fadeIn();
      $("#diveditar").slideUp();
  });
    //this.cargarHistorial();
  }

  cargarDetalles(){
    this._autosService.cargarDetalles(this.id)
            .subscribe( respuesta => {
              this.sistema = respuesta[0]; 
            });
  }

  cargarHistorial(){
    this._autosService.cargarDetalles(this.detalles)
            .subscribe( sistema => {
              this.sistema = sistema 
            });
  }

  coordenadas(Lat: string, Lon: string){
    window.open("https://www.google.com.mx/maps/place/"+Lat+"+"+Lon);
  }
}
