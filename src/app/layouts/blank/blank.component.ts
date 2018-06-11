import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'blank-layout',
  templateUrl: './blank.component.html',
  styleUrls: []
})
export class BlankComponent {

  public config: PerfectScrollbarConfigInterface = {};
  constructor() { }

    ngOnInit() {

    }
}