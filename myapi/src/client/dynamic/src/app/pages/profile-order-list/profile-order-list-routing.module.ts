import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileOrderListComponent } from './profile-order-list.component';

const appRoutes: Routes = [
  { path: '', component: ProfileOrderListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileOrderListRoutingModule {}