import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/service.index';
import { AutosService } from '../../../services/autos/autos.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html'
})
export class AutosComponent implements OnInit {

  constructor(public _autosService: AutosService,) { }

  ngOnInit() {
  }

}
