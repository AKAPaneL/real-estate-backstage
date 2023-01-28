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
            name: '东城区',
            value: 120
          },
          {
            name: '西城区',
            value: 110
          },
          {
            name: '朝阳区',
            value: 77
          },
          {
            name: '海淀区',
            value: 90
          },
          {
            name: '丰台区',
            value: 60
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
