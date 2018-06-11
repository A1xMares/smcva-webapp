import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../../services/service.index';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Historial } from '../../../models/historial.model';
import { Auto } from '../../../models/autos.model';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: []
})
export class DetallesComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;
  imagenSubir: File;
  imagenTemp: string;
  formd: FormGroup;
  id: string;
  sistema: Auto;
  apodo: string;
  numserie: string;
  usuario: string;
  modelo: string;
  img: string;
  _id: string;
  historial: Historial[];
  constructor(
    public _autosService: AutosService,
    public router: Router, 
    public route: ActivatedRoute, 
    private modalService: NgbModal,
  ) { this.verDetalles(); }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.verDetalles();
    this.formd = new FormGroup({
    });
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
    $('#to-detalles').on("click", function() {
      $("#divfoto").slideUp();
      $("#divdetalles").fadeIn();
      $("#diveditar").slideUp();
    });
    $('.to-detalles').on("click", function() {
      $("#divfoto").slideUp();
      $("#divdetalles").fadeIn();
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

  cargarHistorial(){
    console.log(this.numserie)
    this._autosService.cargarHistorial(this.numserie)
            .subscribe( sistema => {
              this.historial = sistema
              this.coordenadas(this.historial[0].Lat,this.historial[0].Lon,this.historial[0].Mov1,this.historial[0].Mov2,this.historial[0].Imp1,this.historial[0].Imp2,this.historial[0].Imp3,this.historial[0].Imp4,this.historial[0].Imp5);
            });
  }

  verDetalles(){
        this._autosService.cargarDetalles( this.id )
                  .subscribe( correcto => {
                    this.numserie = correcto.sistema.numserie;
                    this.usuario = correcto.sistema.usuario;
                    this.apodo = correcto.sistema.apodo;
                    this.modelo = correcto.sistema.modelo;
                    this.img = correcto.sistema.img;
                    this._id = correcto.sistema._id;
                    this.cargarHistorial();    
                    return this.sistema = correcto.sistema;
                  });
  }

  actualizar( auto: Auto ) {
    this.sistema.numserie = auto.numserie;
    this.sistema.usuario = this.usuario;
    this.sistema.apodo = auto.apodo;
    this.sistema.modelo = auto.modelo;
    this.sistema.img = this.img;
    this.sistema._id = this.id;
    this._autosService.actualizarSistema( this.sistema )
                .subscribe( resp => {
                  this.verDetalles();
                  $("#divdetalles").fadeIn();
                  $("#diveditar").slideUp();
                  return;
                });
  }

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

  eliminar(formd: NgForm){
                    this._autosService.borrarAuto( this._id )
                    .subscribe( correcto => {
                      this.router.navigate(['/mis-autos']);
                      this.formd.reset();
                      $(".close").click();
                    });
  }

  cambiarImagen() {
    this._autosService.cambiarImagen( this.imagenSubir, this.id )
    .then( () => {
      this.verDetalles();
    });
  }

  open2(elimina) { 
    this.modalService.open(elimina).result.then((result) => {
      this.formd.reset();
    }, (reason) => {
      this.formd.reset();
    });
  }
  coordenadas(Lat: string, Lon: string, 
    Mov1:string,
    Mov2:string,
    Imp1:string,
    Imp2:string,
    Imp3:string,
    Imp4:string,
    Imp5:string){
    var x = Lat;
    var y = +x; // 
    var t = Lon;
    var u = +t; // 
    var pin = {lat: y, lng: u};
    var mapProp = {
      center: new google.maps.LatLng(y, u),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.marker = new google.maps.Marker({position:pin, map:this.map,title:'Sensor activado'});
    console.log(Mov1);
    $('#mov1').text(Mov1);
    $('#mov2').text(Mov2);
    $('#imp1').text(Imp1);
    $('#imp2').text(Imp2);
    $('#imp3').text(Imp3);
    $('#imp4').text(Imp4);
    $('#imp5').text(Imp5);
  }
}
