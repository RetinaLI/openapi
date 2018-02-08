import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const appRoutes: Routes = [
  { path: '', component: ProfileComponent }
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
export class ProfileRoutingModule {}