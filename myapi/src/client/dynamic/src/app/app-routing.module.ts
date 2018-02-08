import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuardService } from "./providers/auth-guard.service"
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageNoAccessComponent } from './components/page-no-access/page-no-access.component';
import { LookForwardComponent } from './components/look-forward/look-forward.component';

const appRoutes: Routes = [
  // { path: 'ops', loadChildren: './pages/layout/layout.module#LayoutModule' },
  { path: 'profile', loadChildren: './pages/layout/layout.module#LayoutModule' },
  { path: '', redirectTo: "profile", pathMatch: "full" },
  { path: 'page-no-access', component: PageNoAccessComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}