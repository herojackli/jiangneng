<template>
  <div class="HONGAN4D-common-layout">
    <div class="HONGAN4D-common-layout-center">
      <el-row class="HONGAN4D-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="HONGAN4D-common-layout-main HONGAN4D-flex-main">
        <div class="HONGAN4D-common-head">
          <el-button type="danger" icon="el-icon-delete" @click="ClearAll()">
            清空所有</el-button>
          <div class="HONGAN4D-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
          </div>
        </div>
        <HONGAN4D-table v-loading="listLoading" :data="list">
          <el-table-column prop="name" label="名称" sortable>
            <template slot-scope="scope">
              <el-link @click="addOrUpdateHandle(scope.row.name)" style="font-size:12px">
                {{ scope.row.name }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="overdueTime" label="过期" sortable width="160"
            :formatter="hongan4d.tableDateFormat" />
          <el-table-column prop="cacheSize" label="大小" width="90">
            <template slot-scope="scope">{{scope.row.cacheSize | toFileSize()}}</template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="HONGAN4D-table-delBtn"
                @click="handleDel(scope.$index,scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </HONGAN4D-table>
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @close="formVisible=false" @refreshDataList="initData" />
  </div>
</template>

<script>
import { CacheManageList, CacheManageClear, CacheManageClearAll } from '@/api/system/cacheManage'
import Form from './Form'
export default {
  name: 'system-cache',
  components: { Form },
  data() {
    return {
      keyword: '',
      list: [],
      listLoading: true,
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    search() {
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.search()
    },
    initData() {
      this.listLoading = true
      CacheManageList({ keyword: this.keyword }).then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm('您确定要清空缓存数据吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.asyncDel(index, id);
      }).catch(() => { });
    },
    asyncDel(index, id) {
      CacheManageClear(id).then(res => {
        this.list.splice(index, 1);
        this.$message({
          type: 'success',
          message: res.msg
        });
        // this.initData()
      })
    },
    ClearAll() {
      this.$confirm('您确定要清空所有缓存数据吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        CacheManageClearAll().then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.reset()
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>