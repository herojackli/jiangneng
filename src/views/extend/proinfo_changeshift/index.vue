<template>
    <div class="HONGAN4D-common-layout">
        <div class="HONGAN4D-common-layout-center">
            <el-row class="HONGAN4D-common-search-box" :gutter="16">
                <el-form @submit.native.prevent>
                                            <el-col :span="6">
                                <el-form-item label="年份">
                                        <el-date-picker v-model="query.year" type="yearrange"
                                                        value-format="timestamp" format="yyyy" start-placeholder="开始日期"
                                                        end-placeholder="结束日期" >
                                        </el-date-picker>
                                </el-form-item>
                            </el-col>
                        <el-col :span="6">
                                <el-form-item label="调班人员">
                                        <user-select  v-model="query.userid" placeholder="请选择
                                        " clearable/>
                                </el-form-item>
                            </el-col>
                        <el-col :span="6">
                                <el-form-item label="被调班人">
                                        <user-select  v-model="query.transfershiftid" placeholder="请选择
                                        " clearable/>
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
                                    <el-button type="primary" icon="el-icon-plus"  @click="addOrUpdateHandle()">新增
                                    </el-button>
                                    <el-button type="text" icon="el-icon-download" @click="exportData()" >导出
                                    </el-button>
                    </div>
                    <div class="HONGAN4D-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                                     @click="reset()"/>
                        </el-tooltip>
                        <screenfull isContainer />
                    </div>
                </div>
                <HONGAN4D-table v-loading="listLoading" :data="list" @sort-change='sortChange' >
                            <el-table-column prop="userid" label="调班人员" width="0" align="left"
/>
                            <el-table-column prop="transfershiftid" label="被调班人" width="0" align="left"
/>
                            <el-table-column prop="year" label="年份" width="0" align="left"
/>
                            <el-table-column prop="preshiftworktime" label="调班前上班时间" width="0" align="left"
/>
                            <el-table-column prop="aftershiftworktime" label="调班后上班时间" width="0" align="left"
/>
                            <el-table-column prop="changeshiftreason" label="调班事由" width="0" align="left"
/>
                    <el-table-column prop="flowState" label="状态" width="100">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.flowState==1">等待审核</el-tag>
                            <el-tag type="success" v-else-if="scope.row.flowState==2">审核通过</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.flowState==3">审核驳回</el-tag>
                            <el-tag type="info" v-else-if="scope.row.flowState==4">流程撤回</el-tag>
                            <el-tag type="info" v-else-if="scope.row.flowState==5">审核终止</el-tag>
                            <el-tag type="warning" v-else>等待提交</el-tag>
                        </template>
                    </el-table-column>
                        <el-table-column label="操作" fixed="right"
                                         width="100" >
                            <template slot-scope="scope">
                                        <el-button type="text" :disabled="[1,2,4,5].indexOf(scope.row.flowState)>-1"
                                                   @click="addOrUpdateHandle(scope.row.id)" >编辑
                                        </el-button>
                                        <el-button type="text" class="HONGAN4D-table-delBtn" :disabled="!!scope.row.flowState"  @click="handleDel(scope.row.id)">删除
                                        </el-button>
                                        <el-button size="mini" type="text" :disabled="!scope.row.flowState"
                                                   @click="addOrUpdateHandle(scope.row.id,scope.row.flowState)"
                                        >详情</el-button>
                            </template>
                        </el-table-column>
                </HONGAN4D-table>
                    <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="initData"/>
            </div>
        </div>
        <FlowBox v-if="flowVisible" ref="FlowBox" @close="colseFlow" />
        <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download"/>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import {getDictionaryDataSelector} from '@/api/systemData/dictionary'
    import FlowBox from '@/views/workFlow/components/FlowBox'
    import ExportBox from './ExportBox'
    import {getDataInterfaceRes} from '@/api/systemData/dataInterface'

    export default {
        components: {FlowBox, ExportBox},
        data() {
            return {
                query: {
                                year:undefined,
                                userid:undefined,
                                transfershiftid:undefined,
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
                flowVisible: false,
                exportBoxVisible: false,
                columnList: [
                    {prop: 'userid', label: '调班人员'},
                    {prop: 'transfershiftid', label: '被调班人'},
                    {prop: 'year', label: '年份'},
                    {prop: 'preshiftworktime', label: '调班前上班时间'},
                    {prop: 'aftershiftworktime', label: '调班后上班时间'},
                    {prop: 'changeshiftreason', label: '调班事由'},
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
                    menuId:this.menuId
                };
                request({
                    url: `/api/example/ProInfo_ChangeShift/getList`,
                    method: 'post',
                    data: _query
                }).then(res => {
                    var _list =[];
                    for(let i=0;i<res.data.list.length;i++){
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
                        url: `/api/example/ProInfo_ChangeShift/${id}`,
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
            addOrUpdateHandle(id,flowState) {
                let data = {
                    id: id || '',
                    enCode: 'ProInfoChangeShift',
                    flowId:'305716788266532933',
                    formType: 1,
                    opType: flowState ? 0 : '-1',
                    status: flowState
                }
                this.flowVisible = true
                this.$nextTick(() => {
                    this.$refs.FlowBox.init(data)
                })
            },
            exportData() {
                this.exportBoxVisible = true
                this.$nextTick(() => {
                    this.$refs.ExportBox.init(this.columnList)
                })
            },
            download(data) {
                let query = {...data, ...this.listQuery, ...this.query,menuId:this.menuId}
                request({
                    url: `/api/example/ProInfo_ChangeShift/Actions/Export`,
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
            colseFlow(isrRefresh) {
                this.flowVisible = false
                if (isrRefresh) this.reset()
            },
            reset() {
                for (let key in this.query) {
                    this.query[key] = undefined
                }
                this.listQuery = {
                        currentPage: 1,
                        pageSize: 20,
                    sort: "desc",
                    sidx: "",
                }
                this.initData()
            }
        }
    }
</script>
