<template>
  <div>
    <echarts :option="option" height="180px" />
    <ul class="sale">
      <li v-for="item in saleList" :key="item .id">
        <span>￥{{ item.count.toFixed(1) }}</span>
        <p>{{ item.message }}</p>
      </li>
    </ul>
  </div>
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
        legend: {
          bottom: '0%',
          width: '200',
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle'
        },
        tooltip: {
          show: true
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [8, 40],
            center: ['50%', '40%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 1
            },
            labelLine: {
              length: 0,
              length2: 9
            },
            data: [
              { value: 60, name: 'rose 1' },
              { value: 42, name: 'rose 2' },
              { value: 25, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 15, name: 'rose 5' },
              { value: 30, name: 'rose 6' }
            ]
          }
        ]
      },
      saleList: [
        {
          id: 1,
          count: 1800,
          message: '今日总销售额'
        },
        {
          id: 2,
          count: 370,
          message: '您今日销售额'
        }

      ]
    }
  }
}
</script>
<style scoped lang="scss">
    .sale{
        list-style: none;
        padding: 0;
        margin: 20px 0 0 0;
        display: flex;
        justify-content:center;
        li{
            &:nth-child(1){
                margin-right: 4px;
            }
            &:nth-child(2){
                margin-left: 4px;
            }
            text-align: center;
            background-color: #eeeeee;
            padding: 8px;
            border-radius: 5px;
            border: 1px solid #ececec;
            cursor: pointer;
        }
        span{
            color: #2ec7c9;
            font-size: 20px;
            font-weight: 700;
        }
        p{
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 25px;
        }
    }
</style>
