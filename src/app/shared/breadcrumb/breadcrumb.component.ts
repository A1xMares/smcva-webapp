import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { retry, map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnInit {
  titulo: string;
  constructor( private router: Router, private title: Title, private meta: Meta) {

      this.getDataRoute()
      .subscribe( data => {
        this.titulo = data.titulo;
        this.title.setTitle( this.titulo );
        const metaTag: MetaDefinition = {
          name: 'Description',
          content: this.titulo
        }
        this.meta.updateTag(metaTag);
      });

  }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }

}
