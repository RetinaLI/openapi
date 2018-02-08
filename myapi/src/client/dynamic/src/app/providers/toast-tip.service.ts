import { Injectable } from '@angular/core';

interface IToastTipConfig {
  heading?: string,
  text: string,
  position?: 'bottom-left' | 'bottom-right' | 'top-right' | 'top-left' | 'bottom-center' | 'top-center' | 'mid-center',
  hideAfter?: number,
  loaderBg?: string
}

@Injectable()
export class ToastTipService {

  constructor() { }

  static error(_params: IToastTipConfig) {
    $.toast(Object.assign({}, {
      position: "top-center",
      text: "has error",
      loaderBg: "#ff6849",
      icon: 'error',
      hideAfter: 3500
    }, _params));
  }

  static warn(_params: IToastTipConfig) {
    $.toast(Object.assign({}, {
      position: "top-center",
      text: "has warning",
      loaderBg: "#ff6849",
      icon: 'warning',
      hideAfter: 3500
    }, _params));
  }

  static success(_params: IToastTipConfig) {
    $.toast(Object.assign({}, {
      position: "top-center",
      text: "has success",
      loaderBg: "#ff6849",
      icon: 'success',
      hideAfter: 3500
    }, _params));
  }

  static info(_params: IToastTipConfig) {
    $.toast(Object.assign({}, {
      position: "top-center",
      text: "has info",
      loaderBg: "#ff6849",
      icon: 'info',
      hideAfter: 3500
    }, _params));
  }
}
