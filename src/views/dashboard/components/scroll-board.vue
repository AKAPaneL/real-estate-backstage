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
          ['西城区', '120k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>13%</span>'],
          ['东城区', '110k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>8%</span>'],
          ['朝阳区', '77k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>17%</span>'],
          ['海淀区', '90k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>33%</span>'],
          ['丰台区', '64k', '<span class="up"><i class="iconfont icon-jiantou_xiangshang_o"></i>24%</span>'],
          ['通州区', '47k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>26%</span>'],
          ['石景山区', '61k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>42%</span>'],
          ['顺义区', '49k', '<span class="down"><i class="iconfont icon-jiantou_xiangxia_o-copy"></i>33%</span>']
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
