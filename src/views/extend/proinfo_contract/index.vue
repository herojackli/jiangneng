<template>
    <div class="HONGAN4D-common-layout">
        <div class="HONGAN4D-common-layout-center">
            <el-row class="HONGAN4D-common-search-box" :gutter="16">
                <el-form @submit.native.prevent>
                    <el-col :span="6">
                        <el-form-item label="合同名称">
                            <el-input v-model="query.contractname" placeholder="请输入" clearable> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间">
                            <el-date-picker v-model="query.creationtime" value-format="timestamp" format="yyyy-MM-dd"
                                start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" />
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
                <!-- <div class="HONGAN4D-common-head">
                    <div>
                        <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新增
                        </el-button>
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
                    <el-table-column prop="creationtime" label="创建时间" width="0" align="left" sortable="custom" />
                    <el-table-column prop="contractname" label="合同名称" width="0" align="left" />
                    <el-table-column label="操作" fixed="right" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="addOrUpdateHandle(scope.row.id)">编辑
                            </el-button>
                            <el-button type="text" class="HONGAN4D-table-delBtn" @click="handleDel(scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </HONGAN4D-table>
                <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
                    @pagination="initData" /> -->
                <div class="HONGAN4D-common-head">
                    <div>
                        <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新增
                        </el-button>
                    </div>
                    <div class="HONGAN4D-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link icon="icon-ym icon-ym-Refresh HONGAN4D-common-head-icon" :underline="false"
                                @click="reset()" />
                        </el-tooltip>
                        <screenfull isContainer />
                    </div>
                </div>
                <div class="ht-container">
                    <div class="list">
                        <div class="item" v-for="(item, index) in list" :key="index">
                            <div class="up">
                                <el-image 
                                    style="width: 82px; height: 122px"
                                    :src="(item && item.coverprofileid && JSON.parse(item.coverprofileid).length>0)?(define.comUrl +''+ JSON.parse(item.coverprofileid)[0]['url']) : '../../../assets/images/defaultAsset.png'"
                                    :preview-src-list=" item | handleImg(that)">
                                    <div slot="error" class="image-slot">
                                        <img src="../../../assets/images/defaultAsset.png" alt="" srcset="">
                                    </div>
                                </el-image>
                            </div>
                            <div class="content">
                                <div class="name">{{ item.contractname }}</div>
                                <div class="time">{{ item.creationtime }}</div>
                            </div>
                            <div class="tool">
                                <div class="toolItem" @click="handleDel(item.id)">
                                    <i class="el-icon-delete"></i>
                                    <span class="name">删除</span>
                                </div>
                                <div class="toolItem" @click="look(item)">
                                    <i class="el-icon-download"></i>
                                    <span class="name">查看下载</span>
                                </div>
                                <div class="toolItem" @click="addOrUpdateHandle(item.id)">
                                    <i class="el-icon-edit"></i>
                                    <span class="name">编辑</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
                    @pagination="initData" />
            </div>
        </div>
        <HONGAN4D-Form v-if="formVisible" ref="HONGAN4DForm" @refresh="refresh" />
        <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
        <Detail v-if="detailVisible" ref="Detail" @refresh="detailVisible = false" />
        
        <!-- 浏览文件组件 -->
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
    components: { HONGAN4DForm, ExportBox, Detail, Preview },
    data() {
        return {
            that:this,
            detailVisible: false,
            previewVisible: false,
            activeFile: {},
            query: {
                contractname: undefined,
                creationtime: undefined,
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
                { prop: 'creationtime', label: '创建时间' },
                { prop: 'contractname', label: '合同名称' },
            ],
        }
    },
    filters:{
        handleImg(item,that){
            console.log(that.define,"根")
            console.log(item,"数据")
            let arr = item && item.coverprofileid ? JSON.parse(item.coverprofileid) : []
            let arr1=[]
            if(arr.length>0){
                 arr1 = arr.map(res=>{
                    return that.define.comUrl+""+res.url
                })
            }
           
            return arr1
            // console.log(arr1,"生成数据")
        }
    },
    computed: {
        menuId() {
            return this.$route.meta.modelId || ''
        }
    },
    beforeCreate(){

    },
    created() {
        this.initData()
    },
    methods: {
        look(item) {
            let tmp = item && item.profileid ? JSON.parse(item.profileid) : []
            let obj = tmp && tmp.length > 0 ? tmp[0] : {}
            console.log(obj, "对象")
            this.previewVisible = true;
            this.activeFile = {
                fileId: obj.fileId,
                fileVersionId: obj.fileVersionId,
                url: obj.url,
                name: obj.name
            }

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
        // 获取列表数据
        initData() {
            this.listLoading = true;
            let _query = {
                ...this.listQuery,
                ...this.query,
                menuId: this.menuId
            };
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            request({
                url: `/api/example/ProInfo_Contract/getList`,
                method: 'post',
                data: _query
            }).then(res => {
                loading.close()
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
            console.log(id, "id")
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                request({
                    url: `/api/example/ProInfo_Contract/${id}`,
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
                url: `/api/example/ProInfo_Contract/Actions/Export`,
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
<style  scoped>
.ht-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    /* background: red; */
    overflow-y: auto;
    overflow-x: hidden;
}

.list {

    /* overflow-x: hidden; */
    /* overflow-y: auto; */
    margin-right: -10px;
    padding: 10px;
    float: left
}

.list .item {
    /* display: flex;
    flex-direction: column; */
    display: inline-block;
    width: calc(16.66% - 10px);
    margin-right: 10px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 4px 0px rgba(2, 22, 41, 0.1);
    border-radius: 4px;
}

.list .item .tool {
    display: flex;
}

.list .item .up {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    background: #E3F0FC
}

.list .item .up img {
    width: 82px;
    height: 122px;
}

.list .item .content {
    padding: 10px;
    border-bottom: 1px solid #dddddd;
}

.list .item .content .name {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.list .item .content .time {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    margin-top: 10px
}

.list .item .tool {
    display: flex;
    align-items: center;
    height: 32px;
}

.list .item .tool .toolItem {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: 12px;
    color: #999999;
    cursor: pointer;
}

.list .item .tool .toolItem .name {
    margin-left: 5px;
}
</style>

