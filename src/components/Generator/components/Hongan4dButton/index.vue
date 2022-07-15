<template>
  <div :class="'hongan4d-button hongan4d-button-'+align">
    <el-button v-bind="$attrs" v-on="$listeners">{{buttonText}}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    align: {
      default: 'left'
    },
    buttonText: {
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.hongan4d-button {
  width: 100%;
  &.hongan4d-button-left {
    text-align: left;
  }
  &.hongan4d-button-center {
    text-align: center;
  }
  &.hongan4d-button-right {
    text-align: right;
  }
}
</style>