<template>
  <dv-capsule-chart :config="config" style="width:100%;height: 150px;" />
</template>
<script>
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '南阳',
            value: 20
          },
          {
            name: '周口',
            value: 14
          },
          {
            name: '漯河',
            value: 32
          },
          {
            name: '郑州',
            value: 13
          },
          {
            name: '西峡',
            value: 16
          }
        ],
        unit: 'K/平方'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.dv-capsule-chart::v-deep {
    .label-column{
        color: black    ;
    }
    .unit-label,.unit-text{
        color: black;
    }
}

</style>
