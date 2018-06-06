import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'ti-home',
      url: '/inicio',
      submenu:[]
    },
    {
      titulo: 'Mis autos',
      icono: 'ti-car',
      url: '/mis-autos',
      submenu:[]
    },
    {
      titulo: 'Ayuda',
      icono: 'ti-help',
      url: '/ayuda',
      submenu:[]
    },
    {
      titulo: 'Cuenta',
      icono: 'ti-user',
      url: '/mi-cuenta',
      submenu:[]
    },
    {
      titulo: 'Configuración',
      icono: 'ti-settings',
      url: '/configuracion',
      submenu:[]
    }
  ];

  constructor() { }

}
