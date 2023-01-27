<template>
  <div :id="id" ref="echarts" :class="className" style="height:389px" />
</template>
<script>
import echarts from '@/utils/echarts'
import macarons from '@/components/Echarts/macarons.json'
import bjMap from '@/components/Echarts/bjMap.json'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    }
  },
  mounted() {
    this.loadEcharts()
  },
  methods: {
    loadEcharts() {
      //   const obj = JSON.parse(macarons)
      echarts.registerTheme('macarons', macarons)
      var myChart = echarts.init(this.$refs.echarts, 'macarons')
      var option

      myChart.showLoading()
      myChart.hideLoading()
      echarts.registerMap('BJ', bjMap)
      myChart.setOption(
        (option = {
          backgroundColor: '#ffffff',
          tooltip: {
            show: true,
            formatter: '{b}: {c}/方'
          },
          title: {
            text: '北京市各区房价',
            subtext: '时间：2022.12',
            left: 'center',
            textStyle: {
              color: '#000'
            }
          },
          visualMap: {
            min: 0,
            max: 125000,
            dimension: 0,
            left: 'left',
            top: 'bottom',
            text: ['HIGH', 'LOW'], // 文本，默认为数值文本
            calculable: true,
            inRange: {
              color: ['#3EACE5', '#F02FC2']
            }
          },
          series: [{
            type: 'map',
            mapType: 'BJ',
            zoom: 0.9,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.8)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1,
                areaColor: '#000'
              },
              emphasis: {
                areaColor: '#EABBFF',
                borderColor: 'rgb(255,222,254)',
                borderWidth: 1
              }
            },
            animation: false,
            data: [{
              name: '东城区',
              value: 110871,
              label: {
                normal: {
                  show: false
                }
              }
            }, {
              name: '西城区',
              value: 124558,
              label: {
                normal: {
                  show: false
                }
              }
            }, {
              name: '海淀区',
              value: 90978
            }, {
              name: '朝阳区',
              value: 77642
            }, {
              name: '石景山区',
              value: 61234,
              label: {
                normal: {
                  show: false
                }
              }
            }, {
              name: '大兴区',
              value: 47528
            }, {
              name: '门头沟区',
              value: 48570
            }, {
              name: '昌平区',
              value: 40335
            }, {
              name: '通州区',
              value: 47268
            }, {
              name: '房山区',
              value: 35560
            }, {
              name: '丰台区',
              value: 63413
            }, {
              name: '顺义区',
              value: 49521
            }, {
              name: '怀柔区',
              value: 35400
            }, {
              name: '密云区',
              value: 27347
            }, {
              name: '延庆区',
              value: 17942
            }, {
              name: '平谷区',
              value: 25776
            }]
            // animationDurationUpdate: 1000,
            // animationEasingUpdate: 'quinticInOut'
          }]
        })
      )

      option && myChart.setOption(option)
    }
  }
}
</script>
  <style>

  </style>

