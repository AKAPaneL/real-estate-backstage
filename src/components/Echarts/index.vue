<template>
  <div :id="id" ref="echarts" :class="className" :style="{ height: height, width: width }" />
</template>
<script>
import echarts from '@/utils/echarts'
import macarons from './macarons.json'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '0'
    },
    option: {
      type: Object,
      default: () => ({})
    },
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
      myChart.setOption(this.option)
    }
  }
}
</script>
<style>

</style>
