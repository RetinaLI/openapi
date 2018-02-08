import { NgModule } from '@angular/core';
import { SharedModule } from '../../providers/share.module';
import { ProfileOrderListComponent } from './profile-order-list.component';
import { ProfileOrderListRoutingModule } from "./profile-order-list-routing.module";

@NgModule({
  imports: [
    SharedModule,
    ProfileOrderListRoutingModule
  ],
  declarations: [ProfileOrderListComponent]
})
export class ProfileOrderListModule { }
