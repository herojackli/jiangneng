<template>
    <div class="HONGAN4D-common-layout">

        <div class="HONGAN4D-common-layout-center">
            <el-row class="HONGAN4D-common-search-box" :gutter="16">
                <el-form @submit.native.prevent>
                                            <el-col :span="6">
                                <el-form-item label="培训人员">
                                        <user-select  v-model="query.trainperosonids" placeholder="请选择
                                        " clearable/>
                                </el-form-item>
                            </el-col>
                        <el-col :span="6">
                                <el-form-item label="年份">
                                        <el-date-picker v-model="query.year" type="yearrange"
                                                        value-format="timestamp" format="yyyy" start-placeholder="开始日期"
                                                        end-placeholder="结束日期" >
                                        </el-date-picker>
                                </el-form-item>
                            </el-col>
                        <el-col :span="6">
                                <el-form-item label="结束时间">
                                        <el-date-picker v-model="query.endtime" type="daterange"
                                                        value-format="timestamp" format="yyyy-MM-dd" start-placeholder="开始日期"
                                                        end-placeholder="结束日期" >
                                        </el-date-picker>
                                </el-form-item>
                            </el-col>
                        <template v-if="showAll">
                                    <el-col :span="6">
                                        <el-form-item label="开始时间">
                                                <el-date-picker v-model="query.starttime" type="daterange"
                                                                value-format="timestamp" format="yyyy-MM-dd" start-placeholder="开始日期"
                                                                end-placeholder="结束日期" >
                                                </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="培训类型">
                                                <el-select v-model="query.traintypeenumid" placeholder="请选择"
                                                           clearable>
                                                    <el-option v-for="(item, index) in traintypeenumidOptions" :key="index"
                                                               :label="item.fullName" :value="item.id"
                                                               :disabled="item.disabled"></el-option>
                                                </el-select>
                                        </el-form-item>
                                    </el-col>
                        </template>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                            <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                                <el-button type="text" icon="el-icon-arrow-down" @click="showAll=true" v-if="!showAll">
                                    展开
                                </el-button>
                                <el-button type="text" icon="el-icon-arrow-up" @click="showAll=false" v-else>
                                    收起
                                </el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div class="HONGAN4D-common-layout-main HONGAN4D-flex-main">
                <div class="HONGAN4D-common-head">
                    <div>
                                    <el-button type="primary" icon="el-icon-plus"  @click="addOrUpdateHandle()">新增
                                    </el-button>
                    </div>
                    <div class="HONGAN4D-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                                     @click="reset()"/>
                        </el-tooltip>
                        <screenfull isContainer/>
                    </div>
                </div>
                <HONGAN4D-table v-loading="listLoading" :data="list" @sort-change='sortChange' >
                            <el-table-column prop="title" label="培训标题" width="0" align="left"
/>
                            <el-table-column prop="traintypeenumid" label="培训类型" width="0" align="left"
/>
                            <el-table-column prop="trainperosonids" label="培训人员" width="0" align="left"
/>
                            <el-table-column prop="traininstructor" label="培训讲师" width="0" align="left"
/>
                            <el-table-column prop="starttime" label="开始时间" width="0" align="left"
/>
                            <el-table-column prop="endtime" label="结束时间" width="0" align="left"
/>
                            <el-table-column prop="year" label="年份" width="0" align="left"
/>
                            <el-table-column prop="trainsit" label="培训地点" width="0" align="left"
/>
                            <el-table-column prop="content" label="培训内容" width="0" align="left"
/>
                        <el-table-column label="操作" fixed="right"
                                         width="100" >
                            <template slot-scope="scope">
                                        <el-button type="text"
                                                   @click="addOrUpdateHandle(scope.row.id)" >编辑
                                        </el-button>
                                        <el-button type="text" class="HONGAN4D-table-delBtn"  @click="handleDel(scope.row.id)">删除
                                        </el-button>
                            </template>
                        </el-table-column>
                </HONGAN4D-table>
                    <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="initData"/>
            </div>
        </div>
        <HONGAN4D-Form v-if="formVisible" ref="HONGAN4DForm" @refresh="refresh"/>
        <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download"/>
        <Detail v-if="detailVisible" ref="Detail" @refresh="detailVisible=false"/>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import {getDictionaryDataSelector} from '@/api/systemData/dictionary'
    import HONGAN4DForm from './Form'
    import ExportBox from './ExportBox'
    import {getDataInterfaceRes} from '@/api/systemData/dataInterface'
    import Detail from './Detail'

    export default {
        components: {HONGAN4DForm, ExportBox,Detail},
        data() {
            return {
                    showAll: false,
                detailVisible: false,
                query: {
                                trainperosonids:undefined,
                                year:undefined,
                                endtime:undefined,
                                starttime:undefined,
                                traintypeenumid:undefined,
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
                    {prop: 'title', label: '培训标题'},
                    {prop: 'traintypeenumid', label: '培训类型'},
                    {prop: 'trainperosonids', label: '培训人员'},
                    {prop: 'traininstructor', label: '培训讲师'},
                    {prop: 'starttime', label: '开始时间'},
                    {prop: 'endtime', label: '结束时间'},
                    {prop: 'year', label: '年份'},
                    {prop: 'trainsit', label: '培训地点'},
                    {prop: 'content', label: '培训内容'},
                ],
                            traintypeenumidOptions:[],
                            traintypeenumidProps:{"label":"fullName","value":"id"},
            }
        },
        computed: {
            menuId() {
                return this.$route.meta.modelId || ''
            }
        },
        created() {
                this.initData()
                    this.gettraintypeenumidOptions();
        },
        methods: {
                    gettraintypeenumidOptions() {
                        getDictionaryDataSelector('305728080410837061').then(res => {
                            this.traintypeenumidOptions = res.data.list
                        })
                    },
            goDetail(id){
                this.detailVisible = true
                this.$nextTick(() => {
                    this.$refs.Detail.init(id)
                })
            },
            sortChange({column, prop, order}) {
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
                    url: `/api/example/ProInfo_InductionTrain/getList`,
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
                        url: `/api/example/ProInfo_InductionTrain/${id}`,
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
                let query = {...data, ...this.listQuery, ...this.query,menuId:this.menuId}
                request({
                    url: `/api/example/ProInfo_InductionTrain/Actions/Export`,
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
