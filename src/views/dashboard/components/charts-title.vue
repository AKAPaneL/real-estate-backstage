<template>
  <div class="title-container">
    <svg-icon :icon-class="icon" />
    <span>
      <slot>
        title
      </slot>
    </span>
  </div>
</template>
<script>
import svgIcon from '@/components/SvgIcon'
export default {
  components: {
    svgIcon
  },
  props: {
    icon: {
      type: String,
      default: 'fsux-rank'
    }
  }
}
</script>
<style scoped lang="scss">
.title-container{
    // padding-left: 5px;
    display: flex;
    font-size: 20px;
    line-height: 24px;
    span{
        font-size: 12px;
        padding-left: 8px;
        line-height: 24px;
    }
}
</style>
