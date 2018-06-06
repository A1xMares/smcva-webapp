import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements
OnInit {
    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: string[];
    //this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';

        } else {
            this.showMenu = element;
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';

        } else {
            this.showSubMenu = element;
        }
    }

    constructor( public _sidebar: SidebarService ) { }

    ngOnInit() {
      console.log('hola', this.sidebarnavItems);
        $(function () {
            $(".sidebartoggler").on('click', function() {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");
                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });
        });
        $(function () {
            $(".sideliToggler").on('click', function() {
                if ($("#main-wrapper").hasClass("default") && $( document ).width()<1024) {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });
        });
    }
}
