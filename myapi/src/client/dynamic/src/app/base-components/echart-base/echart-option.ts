import {DefaultOption, BarOption, PieOption, BarVerticalOption, LineOption} from "./option.bar";

// const mergeOption = (_option1, _option2) => {
//   let option = {};

//   Object.keys(_option2).forEach(key => {
//     let value = _option2[key];

//     if(_option1[key] && value instanceof Array) {

//     }

//   });
// };

// const cloneOption = (...args) => {
//   if(args.length <= 1) return $.extend(true, {}, args[0] || {});

// };

export class EchartOption {
  constructor() { }

  static getBarOption(_opt?): { [x:string]:any }{
    let target_option = {};
    let option = BarOption;

    target_option = $.extend(true, {}, DefaultOption, option);
    return target_option;
  }
  static getBarVerticalOption(_opt?): { [x:string]:any }{
    let target_option = {};
    let option = BarVerticalOption;

    target_option = $.extend(true, {}, DefaultOption, option);
    return target_option;
  }

  static getPieOption(_opt?): { [x:string]:any }{
    let target_option = {};
    let option = PieOption;

    target_option = $.extend(true, {}, DefaultOption, option);
    return target_option;
  }

  static getLineOption(_opt?): { [x:string]:any }{
    let target_option = {};
    let option = LineOption;

    LineOption.series[0].markPoint.symbol = "image://" + $(".tip-arrow").attr("src");

    target_option = $.extend(true, {}, DefaultOption, option);
    return target_option;
  }
}
