<template>
  <div class="dashboard-container">
    <!-- 顶部 title  -->
    <div class="dashboard-text">name: {{ name }}</div>
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
                  <li v-for="item in 2" :key="item">
                    <p>今日任务达标率</p>
                    <div>
                      饼图
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
          <chartsTitle icon="fsux-bar" />
          <div>bar</div>
        </div>
      </div>
      <!-- 中间布局 -->
      <div class="center-chart">
        <div class="map">
          <chartsTitle icon="fsux-map" />
          <div>地图</div>
        </div>
        <div class="capsule-chart">
          <chartsTitle icon="fsux-bar" />
          胶囊图片
        </div>
      </div>
      <!-- 右边布局 -->
      <div class="right-chart">
        <div class="right-chart-1">
          <div class="pie">
            <chartsTitle icon="fsux-pie" />
            饼状图
          </div>
          <div class="block">
            <chartsTitle icon="fsux-block" />
            榜单2

          </div>
        </div>
        <div class="line">
          <chartsTitle icon="fsux-line" />
          折线图
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import scrollRanking from './components/scroll-ranking.vue'
import chartsTitle from './components/charts-title.vue'

export default {
  name: 'Dashboard',
  components: {
    scrollRanking,
    chartsTitle
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    // background-color: #212733;
    // color: #fff;
    // min-height: calc(100vh - 50px);
    background-color: #f4f4f4;
    li{
      list-style: none;
    }
    ul,p{
      padding: 0;
      margin: 0;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 50px;
  }

}
.chart-container{
  display: flex;
  justify-content: space-between;
  overflow: auto;
  &>div{
    flex-shrink: 0;
  }
}
.left-chart{
  width: 415px;
  margin-left: 10px;
}
.center-chart{
  width:450px;
  margin-left: 10px;
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
  width: 435px;
  margin-left: 10px;
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
