<template>
  <div class="dashboard-container">
    <!-- 顶部 title  -->
    <div class="dashboard-text">
      <div class="dashboard-header border">
        <span>欢迎您： {{ name }}！</span>
        <p>房地产数据可视化</p>
        <span>{{ time }}</span>
      </div>
    </div>
    <!-- 图表 container -->
    <div class="chart-container">
      <!-- 左边布局 -->
      <div class="left-chart">
        <div class="left-chart-1">
          <ul class="data-list">
            <li v-for="item in dataList" :key="item.id">
              <p>{{ item.title }}</p>
              <span>{{ item.data.toFixed(1) }}</span>
            </li>
          </ul>
          <div class="scroll">
            <div class="ranking-list">
              <charts-title icon="fsux-rank">今年销售排行榜</charts-title>
              <scrollRanking />
            </div>
            <div>
              <div>
                <ul class="rate">
                  <li v-for="item in rateList" :key="item.id" class="border">
                    <p>{{ item.title }}</p>
                    <div>
                      <pieRate :count="item.count" />
                    </div>
                  </li>
                </ul>
              </div>
              <div class="water">
                <dv-water-level-pond :config="waterData" style="width:180px;height: 88px;" />
              </div>
            </div>
          </div>
        </div>
        <!--左边-- 柱状图布局 -->
        <div class="left-chart-2">
          <chartsTitle icon="fsux-bar">同期房价对比</chartsTitle>
          <div>
            <bar />
          </div>
        </div>
      </div>
      <!-- 中间布局 -->
      <div class="center-chart">
        <div class="map">
          <chartsTitle icon="fsux-map">地图数据</chartsTitle>
          <div>
            <bjMap />
          </div>
        </div>
        <div class="capsule-chart">
          <chartsTitle icon="fsux-bar">北京地区房价排行榜</chartsTitle>
          <capsuleChart />
        </div>
      </div>
      <!-- 右边布局 -->
      <div class="right-chart">
        <div class="right-chart-1">
          <div class="pie">
            <chartsTitle icon="fsux-pie">任务通过率</chartsTitle>
            <pieNight />
          </div>
          <div class="block">
            <chartsTitle icon="fsux-block">各地区房价以及变动</chartsTitle>
            <scrollBoard />
          </div>
        </div>
        <div class="line">
          <chartsTitle icon="fsux-line">Top3地区房价变动</chartsTitle>
          <div>
            <lineChart />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import scrollRanking from './components/scroll-ranking.vue'
import chartsTitle from './components/charts-title.vue'
import pieRate from './components/pie-rate.vue'
import capsuleChart from './components/capsule-chart.vue'
import bar from './components/bar.vue'
import lineChart from './components/line-chart.vue'
import scrollBoard from './components/scroll-board.vue'
import pieNight from './components/pie-night.vue'
import bjMap from './components/bjMap.vue'
import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'Dashboard',
  components: {
    bjMap,
    scrollRanking,
    chartsTitle,
    pieRate,
    capsuleChart,
    lineChart,
    bar,
    scrollBoard,
    pieNight
  },
  data() {
    return {
      dataList: [
        {
          id: 1,
          title: '今年累计售出套数',
          data: 120.0
        },
        {
          id: 2,
          title: '本月累计售出套数',
          data: 18.0
        },
        {
          id: 3,
          title: '今日已经售出套数',
          data: 2.0
        },
        {
          id: 4,
          title: '今年失败客户数量',
          data: 56
        },
        {
          id: 5,
          title: '本月失败客户数量',
          data: 12
        },
        {
          id: 6,
          title: '今日失败客户数量',
          data: 3
        }
      ],
      waterData: {
        data: [46, 34],
        shape: 'roundRect',
        waveHeight: 15,
        colors: ['#b6a2de']
      },
      rateList: [
        {
          id: 1,
          count: 60,
          title: '今日任务达标率'
        },
        {
          id: 2,
          count: 40,
          title: '本月任务达标率'
        }
      ],
      time: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    setInterval(() => {
      this.time = moment().format('llll')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    // background-color: #212733;
    // color: #fff;
    min-height: calc(100vh - 50px);
    background-color: #f4f4f4;
    overflow: auto;
    li{
      list-style: none;
    }
    ul,p{
      padding: 0;
      margin: 0;
    }
  }
  &-text {
    line-height: 40px;
    width: 1322px;
    margin: 0 auto;
    .dashboard-header{
      display: flex;
      background-color: #fff;
      justify-content: space-between;
      height: 40px;
      margin: 5px 8px;
      border-radius: 5px;
      padding: 0 10px;
      p{
        width: 400px;
        text-align: center;
        font-size: 24px;
        color: #0c90d0;
      }
      span{
        width: 400px;
        font-size: 18px;
        &:nth-child(3){
          font-size: 14px;
          text-align: right;
        }
      }
  }
  }

}
.border{
  box-shadow: 0 2px 12px 0 rgba(59, 59, 59, 0.1);
}
.chart-container{
  display: flex;
  justify-content:space-between;
  overflow: auto;
  width: 1322px;
  margin: 0 auto;
  &>div{
    flex-shrink: 0;
  }
}
.left-chart{
  width: 415px;
  margin-left: 8px;
  margin-bottom: 8px;
}
.center-chart{
  width:450px;
  margin-left: 8px;
  margin-bottom: 8px;
}
.map{
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(59, 59, 59, 0.1);
}
.capsule-chart{
  padding: 5px;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(59, 59, 59, 0.1);
}
.right-chart{
  width: 425px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  .right-chart-1{
    display: flex;
    justify-content: space-between;
  }
  .pie,.block,.line{
    width: 215px;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(59, 59, 59, 0.1);
  }
  .block{
    width: 205px;
  }
  .line{
    width: 100%;
    margin-top: 5px;
  }
}
.left-chart-1{
  border-radius: 5px;
  .data-list{
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 135px;
      background-color: #fff;
      border-radius: 3px;
      margin-bottom: 5px;
      box-shadow: 0 2px 12px 0 rgba(59, 59, 59, 0.1);
      padding-left: 10px;
    }
    p{
      font-size: 12px;
      color: #333;
      line-height: 1;
      padding-top: 10px;
    }
    span{
      display: block;
      font-size: 20px;
      font-weight: 700;
      line-height: 1;
      margin: 8px 0;
      color: rgb(72, 72, 72);
    }
  }

}
.left-chart-1 .scroll{
  display: flex;
  .ranking-list{
    background-color: #fff;
    padding: 5px;
    width: 240px;
    margin-right: 5px;
  }
  .rate{
    display: flex;
    justify-content: space-between;
    width: 180px;
    li{
      width: 87.5px;
      height: 88px;
      font-size: 12px;
      background-color: #fff;
      border-radius: 3px;
      margin-bottom: 5px;
    }
    p{
      line-height: 20px;
    }
  }
}
.left-chart-2{
  height: 300px;
  margin-top: 5px;
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(59, 59, 59, 0.1);
}
</style>
