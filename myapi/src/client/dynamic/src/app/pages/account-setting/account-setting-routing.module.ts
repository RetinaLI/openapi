import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './account-setting.component';

const appRoutes: Routes = [
  { path: '', component: AccountSettingComponent }
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
export class AccountSettingRoutingModule {}