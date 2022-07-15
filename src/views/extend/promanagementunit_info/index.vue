<template>
    <div class="HONGAN4D-common-layout">

        <div class="HONGAN4D-common-layout-center">
            <el-row class="HONGAN4D-common-search-box" :gutter="16">
                <el-form @submit.native.prevent>
                                            <el-col :span="6">
                                <el-form-item label="管理单位名称">
                                        <el-input v-model="query.manageunitname" placeholder="请输入" clearable>  </el-input>
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
                            <el-table-column prop="manageunitname" label="管理单位名称" width="0" align="left"
/>
                            <el-table-column prop="manageunitaddress" label="管理单位地址" width="0" align="left"
/>
                            <el-table-column prop="propertyguid" label="管理单位性质" width="0" align="left"
/>
                            <el-table-column prop="orderindex" label="排序" width="0" align="left"
 sortable="custom" />
                            <el-table-column prop="manageunitphone" label="管理单位联系电话" width="0" align="left"
/>
                            <el-table-column prop="manageunitfax" label="管理单位传真" width="0" align="left"
/>
                            <el-table-column prop="manageunitchargepersonname" label="管理单位负责人" width="0" align="left"
/>
                            <el-table-column prop="manageunitchargepersonmobile" label="管理单位负责人联系手机" width="0" align="left"
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
                detailVisible: false,
                query: {
                                manageunitname:undefined,
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
                    {prop: 'manageunitname', label: '管理单位名称'},
                    {prop: 'manageunitaddress', label: '管理单位地址'},
                    {prop: 'propertyguid', label: '管理单位性质'},
                    {prop: 'orderindex', label: '排序'},
                    {prop: 'manageunitphone', label: '管理单位联系电话'},
                    {prop: 'manageunitfax', label: '管理单位传真'},
                    {prop: 'manageunitchargepersonname', label: '管理单位负责人'},
                    {prop: 'manageunitchargepersonmobile', label: '管理单位负责人联系手机'},
                ],
                            propertyguidOptions:[],
                            propertyguidProps:{"label":"PropertyName","value":"Id"},
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
                    url: `/api/example/ProManagementUnit_Info/getList`,
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
                        url: `/api/example/ProManagementUnit_Info/${id}`,
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
                    url: `/api/example/ProManagementUnit_Info/Actions/Export`,
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
