import { Injectable } from '@angular/core';
import { AjaxService } from "../providers/ajax.service";

import { IProfile, IMenu, IPlatform } from "./passport.service.interface";


@Injectable()
export class PassportService {

  constructor(private ajaxService: AjaxService) {
  }

  getCurrentUserInfo(): Promise<{
    data: IProfile
  }> {
    return this.ajaxService.call("getCurrentUserInfo") as Promise<{
      data: IProfile
    }>;
  }

  reLogin(){
    document.location.href = "/pages/mobile/login.html";
  }

  renderMenuUrl(menu: IMenu) {
    if (menu.url) {
      menu.url = "model.do/" + menu.url.split("id=")[1];
    } else {
      menu.url = null;
    }

    if (menu.originalUrl) {
      menu.originalUrl = menu.originalUrl.replace("/pages/mobile/", "/");
    } else {
      menu.originalUrl = null;
    }

    if (menu.children && menu.children.length > 0) {
      menu.children.forEach(element => {
        this.renderMenuUrl(element);
      });
    }
  }

  getValidMenus() {
    return this.ajaxService.call("getMobileModuleList").then(result => {
      let list: IMenu[] = result.list && result.list[0] && result.list[0].children || [];

      list.forEach(element => {
        this.renderMenuUrl(element);
      });

      return list;
    });
  }

  validateRoute(id: number = 0) {
    return this.ajaxService.call("validateRouteRedirect", { url: `/model.do?id=${id}` });
  }

  changeAccountPassword(_params: { oldPassword: String, newPassword: String, againPassword: String }): Promise<{
    success: boolean,
    info: string
  }> {
    return this.ajaxService.call("changeAccountPassword", _params) as Promise<{
      success: boolean,
      info: string
    }>;
  }

  loginPlatform(_params: IPlatform){
    return this.ajaxService.call("loginPlatform", {
      username: _params.name,
      password: _params.orginalPassword,
      companyNo: _params.company.code
    }).then(result => {
      if(result.success) {
        if(_params.company.code == "E002") {
          document.location.href = "/web/financial/index.html";
        } else
          document.location.href = "/pages/mobile/index.jsp";
      } else {
        return result;
      }
    });
  }
  getPlatformsByUser(): Promise<{
    list: IPlatform[]
  }>{
    return (this.ajaxService.call("getPlatformsByUser") as Promise<{
      list: IPlatform[]
    }>).then(result => {
      result.list = result.list || [];
      return result;
    });
  }
  addLoginPlatform(_params: {
    companyCode: string,
    userName: string,
    password: string
  }) {
    return (this.ajaxService.call("addLoginPlatform", _params));
  }
}
