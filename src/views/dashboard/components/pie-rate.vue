<template>
  <echarts :option="option" height="68px" />
</template>
<script>
import echarts from '@/components/Echarts'
export default {
  components: {
    echarts
  },
  props: {
    count: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
    }
  },
  computed: {
    option() {
      return {
        color: ['#5ab1ef', '#eeeeee'],
        title: {
          text: `${this.count}%`,
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'none'
        },
        series: [
          {
            name: 'rate',
            type: 'pie',
            radius: ['75%', '85%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: '#fff',
              borderWidth: 0
            },
            colorBy: 'data',
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            emphasis: {
              disabled: true
            },
            data: [
              { value: this.count, name: `${this.count}%` },
              { value: 100 - this.count, name: `${100 - this.count}%` }
            ]
          }
        ]
      }
    }
  }
}
</script>
<style>

</style>
