import { NgModule } from '@angular/core';
import { SharedModule } from '../../providers/share.module';
import { AccountSettingComponent } from './account-setting.component';
import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { PassportService } from "../../services/passport.service";

@NgModule({
  imports: [
    SharedModule,
    AccountSettingRoutingModule
  ],
  declarations: [AccountSettingComponent],
  providers: [PassportService]
})
export class AccountSettingModule { }
