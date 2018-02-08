import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuardService } from "./providers/auth-guard.service"
// import { LookForwardComponent } from '../../components/look-forward/look-forward.component';
import { LayoutComponent } from './layout.component';

const layoutRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', loadChildren: '../profile/profile.module#ProfileModule' },
      { path: 'order/list', loadChildren: '../profile-order-list/profile-order-list.module#ProfileOrderListModule', },
      { path: 'account-setting', loadChildren: '../account-setting/account-setting.module#AccountSettingModule', }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      layoutRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }