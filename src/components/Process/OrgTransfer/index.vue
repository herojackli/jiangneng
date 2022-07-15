
<template>
  <el-dialog :title="title" :close-on-click-modal="false"
    class="HONGAN4D-dialog HONGAN4D-dialog_center transfer-dialog" lock-scroll append-to-body
    v-bind="$attrs" width="800px" :modal-append-to-body="false" v-on="$listeners" @open="onOpen">
    <userTransfer v-model="selectedData" ref="userTransfer" multiple v-if="type==='user'" />
    <roleTransfer v-model="selectedData" ref="roleTransfer" multiple v-else-if="type==='role'" />
    <HONGAN4DTransfer :loading="loading" :treeData="treeData" v-model="selectedData" :type="type"
      ref="HONGAN4DTransfer" v-else />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeTransfer">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import HONGAN4DTransfer from '@/components/HONGAN4D-transfer'
import userTransfer from '@/components/HONGAN4D-userTransfer'
import roleTransfer from './roleTransfer'

export default {
  name: 'org-transfer',
  components: { HONGAN4DTransfer, userTransfer, roleTransfer },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'user'
    },
    title: {
      type: String,
      default: '组织机构'
    },
  },
  data() {
    return {
      loading: false,
      treeData: [],
      selectedData: []
    }
  },
  methods: {
    onOpen() {
      this.dataInit()
    },
    closeTransfer() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$emit('confirm', this.selectedData)
      this.closeTransfer()
    },
    dataInit() {
      this.loading = true
      this.selectedData = []
      this.$nextTick(async () => {
        if (this.type === 'user') {
          this.selectedData = JSON.parse(JSON.stringify(this.value))
          this.$nextTick(() => {
            this.$refs.userTransfer && this.$refs.userTransfer.init()
          })
        } else if (this.type === 'role') {
          this.selectedData = JSON.parse(JSON.stringify(this.value))
          this.$nextTick(() => {
            this.$refs.roleTransfer && this.$refs.roleTransfer.init()
          })
        } else {
          let res = await this.$store.dispatch('base/getPositionTree')
          this.$refs.HONGAN4DTransfer && (this.$refs.HONGAN4DTransfer.filterText = '')
          this.treeData = res
          this.selectedData = this.value
        }
        this.loading = false
      })
    }
  }
}
</script>