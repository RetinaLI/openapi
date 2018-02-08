/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
  metisMenu(...arg):void;
  counterUp(...arg):void;
  footable(...arg):void;
  easyPieChart(opts: any): JQuery,
  modal(opts: any): JQuery
}

declare var echarts: any;
declare var BMap: any;
declare var mobiscroll: any;
declare var Swiper: any;

interface JQueryStatic {
  toast(opts):JQuery;
}

declare var FOTON_GLOBAL: {
  currentTime: number,
  Date: {
    getDateByFormat(_dateStr: string | number | Date, _formatType: string): string
  },
  String: {
    getRealLength(_str: string):number
  },
  Number: {
    getNewNumWithUnit(_num: number, _unit: string): { num: number, unit: string }
  },
  uuid():number
};