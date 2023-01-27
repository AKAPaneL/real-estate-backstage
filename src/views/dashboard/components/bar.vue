<template>
  <echarts :option="option" height="266px" />
</template>
<script>
import echarts from '@/components/Echarts'
export default {
  components: {
    echarts
  },
  data() {
    return {
      option: {
        title: {
          text: 'Rainfall vs Evaporation',
          subtext: 'Fake Data',
          textStyle: {
            fontSize: 13
          }
        },
        grid: {
          bottom: '12%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Rainfall', 'Evaporation'],
          right: 0
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Rainfall',
            type: 'bar',
            data: [
              7.0, 10.9, 16.0, 27.2, 35.6, 66.7, 75.6, 92, 32.6, 20.0, 11.4, 9.3
            ],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ],
              symbolSize: 30,
              label: {
                show: true,
                fontSize: 12,
                color: '#000'
              }
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: 'Evaporation',
            type: 'bar',
            data: [
              3.6, 5.9, 9.0, 26.4, 28.7, 37.7, 75.6, 82, 48.7, 18.8, 6.0, 4
            ],
            markPoint: {
              data: [
                { name: 'Max', value: 82, xAxis: 7, yAxis: 82 },
                { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
              ],
              symbolSize: 30,
              label: {
                show: true,
                fontSize: 12
              }
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      }
    }
  }
}
</script>
<style>

</style>
