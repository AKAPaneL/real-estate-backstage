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
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
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
