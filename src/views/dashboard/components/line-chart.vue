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
          text: 'Stacked Line',
          textStyle: {
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          right: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Video Ads',
            type: 'line',
            data: [150, 232, 201, 154, 330, 210, 320]
          },
          {
            name: 'Direct',
            type: 'line',
            data: [220, 332, 301, 334, 390, 330, 320]
          }
        ]
      }
    }
  }
}
</script>
<style>

</style>
