import { Component, OnInit } from '@angular/core';
import { PassportService } from "../../services/passport.service";
import { ToastTipService } from "../../providers/toast-tip.service";
import { MissionService } from '../../providers/mission.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.less']
})
export class AccountSettingComponent implements OnInit {
  oldPassword: string = "";
  newPassword: string = "";
  againPassword: string = "";

  constructor(private passportService: PassportService, private missionService: MissionService) {

    this.missionService.confirmMission({
      action: "locationChanged", params: {
        menu: {
          name: "个人信息-修改密码"
        }
      }
    });
  }

  ngOnInit() {
  }

  changePassword() {
    this.oldPassword = this.oldPassword.trim();
    this.newPassword = this.newPassword.trim();
    this.againPassword = this.againPassword.trim();

    if (this.oldPassword == "" || this.oldPassword.length ==0) {
      return ToastTipService.warn({
        text: "原密码不能为空！"
      });
    }

    if (this.newPassword == "" || this.newPassword.length == 0) {
      return ToastTipService.warn({
        text: "新密码不能为空！"
      });
    }

    if (this.againPassword == "" ||  this.againPassword.length == 0) {
      return ToastTipService.warn({
        text: "重复新密码不能为空！"
      });
    }

    if (this.newPassword != this.againPassword) {
      return ToastTipService.warn({
        text: "重复新密码与新密码不一致！"
      });
    }

    this.passportService.changeAccountPassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      againPassword: this.againPassword
    }).then(result => {
      if (result.success) {
        ToastTipService.success({
          text: result.info || "修改成功！"
        });
      } else {
        ToastTipService.error({
          text: result.info || "修改失败！"
        });
      }
    });
  }
}
