import { NgModule } from '@angular/core';
import { SharedModule } from "../../providers/share.module";
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule }        from './layout-routing.module';

import { TopSideNavigationComponent } from '../../components/top-side-navigation/top-side-navigation.component';
@NgModule({
  imports: [
    SharedModule,
    LayoutRoutingModule
  ],
  declarations: [
    TopSideNavigationComponent,
    LayoutComponent
  ]
})
export class LayoutModule { }
