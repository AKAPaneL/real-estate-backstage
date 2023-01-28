<template>
  <dv-scroll-ranking-board :config="config" style="width:100%;height: 142px;" class="scroll-ranking" />
</template>
<script>
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '怀柔区',
            value: 15
          },
          {
            name: '顺义区',
            value: 18
          },
          {
            name: '海淀区',
            value: 31
          },
          {
            name: '朝阳区',
            value: 16
          },
          {
            name: '丰台区',
            value: 21
          },
          {
            name: '石景山区',
            value: 14
          },
          {
            name: '延庆区',
            value: 7
          }
        ],
        unit: '套'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.dv-scroll-ranking-board::v-deep{
  color: black;
  line-height: 1;
  .ranking-info{
    font-size: 12px;
  }
  .ranking-info .rank{
    color: #008acd;
    font-weight: 700;
  }
  .ranking-column{
    border-bottom: 2px solid #2ec6c980;
  }
  .ranking-column .inside-column{
    height: 5px;
    border-radius: 5px;
    background-color: #2ec7c9;
  }
}

</style>
