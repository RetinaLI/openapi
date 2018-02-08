export class EchartMapBarOption {
  static getOption(){
    return {
      backgroundColor: 'transparent',
      title: {
        show: false,
        text: '',
        left: 'left',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        show: false,
        trigger: 'item',
        formatter: '{b}'
      },
      visualMap: {
        show: true,
        seriesIndex: 0,
        min: 0,
        max: 2500,
        left: 'center',
        inverse: false,
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: false,
        orient: 'horizontal',
        inRange: {
          // color: ["#f7c800", "#df0000"]
          color: ["#7e9eff", "#52f0ff"]
        }
      },
      xAxis: {
        type: 'category',
        data: [],
        splitNumber: 1,
        show: false
      },
      yAxis: {
        position: 'right',
        min: 0,
        max: 20,
        splitNumber: 20,
        inverse: true,
        axisLabel: {
          show: true
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: []
      },
      series: [
        {
          zlevel: 1,
          name: '中国',
          type: 'map',
          mapType: 'china',
          //selectedMode: 'single',
          roam: false,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              show: false
            }
          },
          data: [
            { name: '南海诸岛', value: 0, itemStyle: { normal: { opacity: 0 }, emphasis: { show: false } } }
          ]
        }
      ]
    }
  }
}