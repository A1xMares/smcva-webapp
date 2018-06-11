import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'sistema'): any {
    let url = URL_SERVICIOS + '/img';
    if ( !img ) {
      return url + '/sistemas/generic';
    }
    switch ( tipo ) {
      case 'sistema':
        url += '/sistemas/' + img;
      break;
      default:
        url += '/sistemas/generic';
    }
    return url;
  }
}
