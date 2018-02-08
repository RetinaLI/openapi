import { Component, OnInit, Input, ViewContainerRef, AfterViewInit } from '@angular/core';
import { geoCoord } from "../../base-components/echarts/map";

@Component({
  selector: 'app-echart-map-china',
  templateUrl: './echart-map-china.component.html',
  styleUrls: ['./echart-map-china.component.css']
})
export class EchartMapChinaComponent implements OnInit, AfterViewInit {
  @Input("option")
  set _options(_opt: any) {
    this.option = _opt;
    if(this.option) this.renderMap();
  }

  @Input("loading")
  set loading(_show_loading: boolean) {
    if (!this.mapChart) return;
    if (_show_loading)
      this.mapChart.showLoading();
    else
      this.mapChart.hideLoading();
  }

  private option: any = {
    backgroundColor: "transparent",
    title: {
      text: '',
      left: 'left',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      show: false
    },
    geo: {
      map: 'china',
      // regions: [{
      //   name: '南海诸岛',
      //   value: 0,
      //   itemStyle: {
      //     normal: {
      //       opacity: 0,
      //       label: {
      //         show: false
      //       }
      //     }
      //   }
      // }], //去掉南海诸岛
      label: {
        emphasis: {
          show: true
        },
        normal: {
          show: true,
          textStyle: {
            color: "white"
          }
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      }
    },
    series: [{
      name: '',
      type: 'scatter',
      coordinateSystem: 'geo',
      // symbol: "pin",
      // symbolSize: 60,
      data: []
    }]
  }
  private mapChart;
  private $element: JQuery;

  constructor(private element: ViewContainerRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.$element = $(this.element.element.nativeElement).find(".echart-map-china");
    this.$element.attr("id", "echart_map_china_" + Date.now());
    if (!this.mapChart)
      this.mapChart = echarts.init(this.$element[0], "macarons");

    this.renderMap();
  }

  renderMap() {
    if (!this.mapChart || !this.option) return;
    if (this.loading) this.mapChart.showLoading();
    else this.mapChart.hideLoading();
    this.mapChart.setOption(this.option);
  }

  resizeMap(){
    if(!this.mapChart) return;
    this.mapChart.resize();
  }
}
