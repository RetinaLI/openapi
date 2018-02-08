/* tslint:disable:member-ordering no-unused-variable */
import {
  ModuleWithProviders, NgModule
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { PageNoAccessComponent } from '../components/page-no-access/page-no-access.component';
import { LookForwardComponent } from '../components/look-forward/look-forward.component';

import { ServerRoutesService } from "../config/server-routes.service";
import { AjaxService } from "../providers/ajax.service";
import { MissionService } from "../providers/mission.service";
import { CarService } from "../services/car.service";
import { ToastTipService } from "./toast-tip.service";
// import { AuthGuardService } from "./providers/auth-guard.service";

let declarations = [
  PageNotFoundComponent,
  PageNoAccessComponent,
  LookForwardComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: declarations,
  exports: declarations,
  providers: [ServerRoutesService, AjaxService, MissionService, CarService, ToastTipService]
})
export class CoreModule {

  constructor() {
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/