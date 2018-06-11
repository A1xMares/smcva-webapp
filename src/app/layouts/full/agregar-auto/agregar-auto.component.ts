import { AutosService } from './../../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auto } from '../../../models/autos.model';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-agregar-auto',
  templateUrl: './agregar-auto.component.html',
  styles: []
})
export class AgregarAutoComponent implements OnInit {
  forma: FormGroup;
  token: string;
  id: string;
  constructor(public _autoService: AutosService,
    public router: Router) { }

  ngOnInit() {
    this.forma = new FormGroup({
      numSerial: new FormControl( null , Validators.required ),
      apodo: new FormControl( null , Validators.required ),
      modelo: new FormControl( null )
    });
  }

  registrarAuto() {
    if ( localStorage.getItem('id')) {
      this.id = localStorage.getItem('id');
    } else {
      this.id = null;
      return;
    }
    if ( this.forma.invalid ) {
      return;
    }
    let auto = new Auto(
      this.forma.value.numSerial,
      '',
      this.forma.value.apodo,
      this.forma.value.modelo

    );
    this._autoService.guardarSistema( auto )
              .subscribe( resp => {
                this.router.navigate(['/detalles/'+ resp._id]);
                return;
              });
  }
}
  