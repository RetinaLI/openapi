import { Component, OnInit, AfterViewInit, Input, Output, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-echart-map-bar-china',
  templateUrl: './echart-map-bar-china.component.html',
  styleUrls: ['./echart-map-bar-china.component.css']
})
export class EchartMapBarChinaComponent implements OnInit, AfterViewInit {
  @Input('option')
  set _options(_opt: any) {
    this.option = _opt;
    if (this.option) {
      this.renderMap();
    }
  }

  @Input()
  set loading(_show_loading: boolean) {
    if (!this.mapChart) {
      return;
    }
    if (_show_loading) {
      this.mapChart.showLoading();
    } else {
      this.mapChart.hideLoading();
    }
  }

  @Input() startColor = '#afe8ff'; // "#DEFEFE"
  @Input() endColor = '#2a99c9';  // "#DEFEFE"

  private option: any;
  private mapChart;
  private $element: JQuery;

  constructor(private element: ViewContainerRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.$element = $(this.element.element.nativeElement).find(".echart-map-bar-china");
    this.$element.attr("id", "echart_map_bar_china_" + Date.now());
    if (!this.mapChart)
      this.mapChart = echarts.init(this.$element[0], "macarons");

    this.renderMap();
  }
  /**
   * 根据值获取线性渐变颜色
   * @param  {String} start 起始颜色
   * @param  {String} end   结束颜色
   * @param  {Number} max   最多分成多少分
   * @param  {Number} val   渐变取值
   * @return {String}       颜色
   */
  getGradientColor(start, end, max, val) {
    var rgb = /#((?:[0-9]|[a-fA-F]){2})((?:[0-9]|[a-fA-F]){2})((?:[0-9]|[a-fA-F]){2})/;
    var sM = start.match(rgb);
    var eM = end.match(rgb);
    var err = '';
    max = max || 1
    val = val || 0
    if (sM === null) {
      err = 'start';
    }
    if (eM === null) {
      err = 'end';
    }
    if (err.length > 0) {
      throw new Error('Invalid ' + err + ' color format, required hex color');
    }
    var sR = parseInt(sM[1], 16),
      sG = parseInt(sM[2], 16),
      sB = parseInt(sM[3], 16);
    var eR = parseInt(eM[1], 16),
      eG = parseInt(eM[2], 16),
      eB = parseInt(eM[3], 16);
    var p = val / max;
    var gR = Math.round(sR + (eR - sR) * p).toString(16),
      gG = Math.round(sG + (eG - sG) * p).toString(16),
      gB = Math.round(sB + (eB - sB) * p).toString(16);
    return '#' + gR + gG + gB;
  }
  calcOption() {
    let new_option = this.mapChart.getOption();

    var TOPN = 25;
    if(!new_option || !new_option.grid) return;

    // 修改top
    new_option.grid[0].height = TOPN * 20
    new_option.yAxis[0].max = TOPN
    new_option.yAxis[0].splitNumber = TOPN
    new_option.series[1].data[0] = TOPN

    new_option.series[0].data.sort((a, b) => b.value - a.value);

    let data = new_option.series[0].data;

    let last_item = data.slice(-2, -1);

    let maxValue = data[0] && data[0].value || 2500;
    let minValue = last_item[0] && last_item[0].value || 0;

    let s = this.startColor, e = this.endColor;

    let sColor = this.getGradientColor(s, e, maxValue, minValue);
    let eColor = this.getGradientColor(s, e, maxValue, maxValue);
    let newYAxisArr = [];
    data.forEach(element => {
      var c = this.getGradientColor(sColor, eColor, maxValue, element.value)
      newYAxisArr.push({
        value: element.name,
        show: false,
        textStyle: {
          color: c
        }
      })
    });

    new_option.yAxis[0].data = newYAxisArr;
    new_option.yAxis[0].axisLabel.formatter = (function (data) {
      return function (value, i) {
        if (!value) return '';
        return value + ' ' + data[i].value;
      };
    })(data);
    this.mapChart.setOption(new_option);
  }

  renderMap() {
    if (!this.mapChart || !this.option) return;
    if (this.loading) this.mapChart.showLoading();
    else this.mapChart.hideLoading();
    this.mapChart.setOption(this.option);
    // this.calcOption();
  }

  resizeMap() {
    if (!this.mapChart) return;
    this.mapChart.resize();
  }
}
