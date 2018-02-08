import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PassportService } from "../../services/passport.service";
import { ToastTipService } from "../../providers/toast-tip.service";

@Component({
  selector: 'app-choose-platform',
  templateUrl: './choose-platform.component.html',
  styleUrls: ['./choose-platform.component.less'],
  providers: [PassportService]
})
export class ChoosePlatformComponent implements OnInit, AfterViewInit {
  platforms = [];
  showAddCompanyDialog = false;

  userName = "";
  password = "";
  loginResult = "login_mobile";
  companyNo = "";


  constructor(private passportService: PassportService) { }

  ngOnInit() {
    this.bindData();
  }

  resetForm(){
    this.userName = "";
    this.password = "";
    this.companyNo = "";
  }

  ngAfterViewInit(){
    this.resetForm();
  }

  bindData(){
    this.platforms = [];
    let str = "车联网平台";
    this.passportService.getPlatformsByUser().then(result => {
      this.platforms = result.list;
      if(!this.platforms || this.platforms.length == 0) {
        // this.passportService.reLogin();
      }
      /*.map(item => {
        return {
          companyName: item.company.name.indexOf(str) > -1 ? item.company.name.replace(str, "") : item.company.name,
          companyCode: item.company.code,
          extName: item.company.name.indexOf(str) > -1 ? str : "",
          userName: item.name,
          password: item.orginalPassword
        };
      });*/
    });
  }

  switchPlatform(_item) {
    this.passportService.loginPlatform(_item).then(result => {
      if (!result.success)
        ToastTipService.warn({
          text: result.info
        });
    });
  }

  trackByPlatforms(index: number, data: any): number {
    return index;
  }
  backHistory(){
    window.history.back();
  }

  showAddNewCompanyDialog(){
    this.resetForm();
    this.showAddCompanyDialog = true;
  }

  addNewCompany(){
    this.userName = this.userName.trim();
    this.password = this.password.trim();
    this.companyNo = this.companyNo.trim();
    if(!this.password || !this.userName || !this.companyNo) {
      return ToastTipService.error({
        text: "请填写" + (!this.userName && "用户名" || !this.password && "密码" || !this.companyNo && "企业代码") + "！"
      });
    }
    this.passportService.addLoginPlatform({
      password: this.password,
      companyCode: this.companyNo,
      userName: this.userName
    }).then(result => {
      this.resetForm();
      if(result.success) {
        this.showAddCompanyDialog = false;
        this.bindData();
      } else {
        ToastTipService.error({
          text: result.info
        });
      }
    });
  }

  hideAddCompanyDialog(){
    this.resetForm();
    this.showAddCompanyDialog = false;
  }
}
