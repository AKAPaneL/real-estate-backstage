<template>
  <dv-scroll-board :config="config" style="height:273px" />
</template>
<script>
export default {
  data() {
    return {
      config: {
        header: ['地区', '房价', '变化率'],
        data: [
          ['地区1', '12k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>13%</span>'],
          ['地区2', '12k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>8%</span>'],
          ['地区3', '12k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>17%</span>'],
          ['地区4', '12k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>33%</span>'],
          ['地区5', '12k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>24%</span>'],
          ['地区6', '12k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>26%</span>'],
          ['地区7', '12k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>42%</span>'],
          ['地区8', '12k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>33%</span>']
        ],
        hoverPause: true,
        headerBGC: '#2ec7c9',
        oddRowBGC: '#ececec',
        evenRowBGC: '#fdfdfd',
        rowNum: 6,
        align: ['center', 'center', 'center']
      }
    }
  }
}
</script>
<style scoped lang="scss">
.dv-scroll-board::v-deep{
    border-radius: 5px;
    overflow: hidden;
    color: black;
    .up{
        color: red;
    }
    .down{
        color: #33cea0;
    }
    .up>i,.down>i{
        font-weight: 700;
    }
}

</style>
