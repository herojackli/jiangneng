<template>
  <div class="comSelect-container">
    <HONGAN4D-TreeSelect :options="treeData" v-model="innerValue" :placeholder="placeholder"
      :clearable="clearable" :disabled="disabled" v-on="$listeners" lastLevel lastLevelKey='type'
      :multiple="multiple" lastLevelValue='user'>
    </HONGAN4D-TreeSelect>
  </div>
</template>

<script>
export default {
  name: 'userSelect',
  props: ["value", "disabled", "placeholder", "multiple", "clearable"],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      treeData: [],
      innerValue: this.value
    }
  },
  methods: {
    async getData() {
      this.treeData = await this.$store.dispatch('base/getUserTree')
    }
  },
  created() {
    this.getData()
  },
  watch: {
    innerValue(val) {
      // val && this.$emit('change', val)
    },
    value(val) {
      this.innerValue = val
    }
  }
}
</script>
<style lang="scss">
.comSelect-container {
  .el-select {
    width: 100%;
  }
}
</style>