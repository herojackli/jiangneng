<template>
    <div class="HONGAN4D-common-layout">

        <div class="HONGAN4D-common-layout-center">
            <el-row class="HONGAN4D-common-search-box" :gutter="16">
                <el-form @submit.native.prevent>
                    <el-col :span="6">
                        <el-form-item label="年份">
                            <el-date-picker v-model="query.year" type="yearrange" value-format="timestamp" format="yyyy"
                                start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="月份">
                            <el-date-picker v-model="query.month" type="monthrange" value-format="timestamp"
                                format="yyyy-MM" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="用户id">
                            <user-select v-model="query.userid" placeholder="请选择
                                        " clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                            <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div class="HONGAN4D-common-layout-main HONGAN4D-flex-main">
                <div class="HONGAN4D-common-head">
                    <div>
                    </div>
                    <div class="HONGAN4D-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                                @click="reset()" />
                        </el-tooltip>
                        <screenfull isContainer />
                    </div>
                </div>
                <HONGAN4D-table v-loading="listLoading" :data="list" @sort-change='sortChange'>
                    <el-table-column prop="year" label="年份" width="0" align="left" />
                    <el-table-column prop="month" label="月份" width="0" align="left" />
                    <el-table-column prop="userid" label="用户id" width="0" align="left" />
                    <el-table-column prop="workdays" label="上班天数" width="0" align="left" />
                    <el-table-column prop="latenum" label="迟到次数" width="0" align="left" />
                    <el-table-column prop="leaveearlynum" label="早退次数" width="0" align="left" />
                    <el-table-column prop="leavedays" label="请假天数" width="0" align="left" />
                    <el-table-column prop="absenteeismdays" label="旷工天数" width="0" align="left" />
                </HONGAN4D-table>
                <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
                    @pagination="initData" />
            </div>
        </div>
        <HONGAN4D-Form v-if="formVisible" ref="HONGAN4DForm" @refresh="refresh" />
        <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
        <Detail v-if="detailVisible" ref="Detail" @refresh="detailVisible = false" />

        <Preview :visible.sync="previewVisible" :file="activeFile" />
    </div>
</template>

<script>
import request from '@/utils/request'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import HONGAN4DForm from './Form'
import Preview from "@/components/Generator/components/Upload/Preview"
import ExportBox from './ExportBox'
import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
import Detail from './Detail'

export default {
    components: { HONGAN4DForm, ExportBox, Detail,Preview },
    data() {
        return {
            detailVisible: false,
            previewVisible:false,
            query: {
                year: undefined,
                month: undefined,
                userid: undefined,
            },
            treeProps: {
                children: 'children',
                label: 'fullName',
                value: 'id'
            },
            list: [],
            listLoading: true,
            total: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 20,
                sort: "desc",
                sidx: "",
            },
            formVisible: false,
            exportBoxVisible: false,
            columnList: [
                { prop: 'year', label: '年份' },
                { prop: 'month', label: '月份' },
                { prop: 'userid', label: '用户id' },
                { prop: 'workdays', label: '上班天数' },
                { prop: 'latenum', label: '迟到次数' },
                { prop: 'leaveearlynum', label: '早退次数' },
                { prop: 'leavedays', label: '请假天数' },
                { prop: 'absenteeismdays', label: '旷工天数' },
            ],
        }
    },
    computed: {
        menuId() {
            return this.$route.meta.modelId || ''
        }
    },
    created() {
        this.initData()
    },
    methods: {
        look(){
            this.previewVisible = true;
        },
        goDetail(id) {
            this.detailVisible = true
            this.$nextTick(() => {
                this.$refs.Detail.init(id)
            })
        },
        sortChange({ column, prop, order }) {
            this.listQuery.sort = order == 'ascending' ? 'asc' : 'desc'
            this.listQuery.sidx = !order ? '' : prop
            this.initData()
        },
        initData() {
            this.listLoading = true;
            let _query = {
                ...this.listQuery,
                ...this.query,
                menuId: this.menuId
            };
            request({
                url: `/api/example/ProInfo_Attendances/getList`,
                method: 'post',
                data: _query
            }).then(res => {
                var _list = [];
                for (let i = 0; i < res.data.list.length; i++) {
                    let _data = res.data.list[i];
                    _list.push(_data)
                }
                this.list = _list
                this.total = res.data.pagination.total

                this.listLoading = false
            })
        },
        handleDel(id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                request({
                    url: `/api/example/ProInfo_Attendances/${id}`,
                    method: 'DELETE'
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        onClose: () => {
                            this.initData()
                        }
                    });
                })
            }).catch(() => {
            });
        },
        addOrUpdateHandle(id, isDetail) {
            this.formVisible = true
            this.$nextTick(() => {
                this.$refs.HONGAN4DForm.init(id, isDetail)
            })
        },
        exportData() {
            this.exportBoxVisible = true
            this.$nextTick(() => {
                this.$refs.ExportBox.init(this.columnList)
            })
        },
        download(data) {
            let query = { ...data, ...this.listQuery, ...this.query, menuId: this.menuId }
            request({
                url: `/api/example/ProInfo_Attendances/Actions/Export`,
                method: 'GET',
                data: query
            }).then(res => {
                if (!res.data.url) return
                window.location.href = this.define.comUrl + res.data.url
                this.$refs.ExportBox.visible = false
                this.exportBoxVisible = false
            })
        },
        search() {
            this.listQuery = {
                currentPage: 1,
                pageSize: 20,
                sort: "desc",
                sidx: "",
            }
            this.initData()
        },
        refresh(isrRefresh) {
            this.formVisible = false
            if (isrRefresh) this.reset()
        },
        reset() {
            for (let key in this.query) {
                this.query[key] = undefined
            }
            this.search()
        }
    }
}
</script>
