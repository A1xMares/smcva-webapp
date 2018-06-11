import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from './../pipes/pipes.module';

import { NavigationComponent } from './header-navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    PerfectScrollbarModule,
    RouterModule,
    NgbModule.forRoot(),
    CommonModule,
    PipesModule
  ],
  declarations: [
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ],
  exports: [
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
