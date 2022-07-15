<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="标题"  
 prop="title" >
                    <el-input    v-model="dataForm.title"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
    <el-col :span="24"  >
    <el-form-item label-width="0">
            <div class="HONGAN4D-common-title">
                <h2>相关问答</h2>
            </div>
    <el-table :data="dataForm.proinfo_mediagossiprecordList" size='mini'   show-summary :summary-method="getproinfo_mediagossiprecordSummaries"  >
        <el-table-column type="index" width="50" label="序号" align="center" />
            <el-table-column prop="question" label="问题">
                <template slot-scope="scope">
                    <el-input   v-model="scope.row.question"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
            </template>
        </el-table-column>
            <el-table-column prop="answer" label="回答">
                <template slot-scope="scope">
                    <el-input   v-model="scope.row.answer"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
            </template>
        </el-table-column>
    <el-table-column label="操作" width="50" >
        <template slot-scope="scope">
            <el-button size="mini" type="text" class="HONGAN4D-table-delBtn" @click="delproinfo_mediagossiprecordList(scope.$index)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <div class="table-actions" @click="addproinfo_mediagossiprecordList()">
        <el-button type="text" icon="el-icon-plus">添加</el-button>
    </div>
    </el-form-item>
    </el-col>
    </template>
</el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false"> 取 消</el-button>
        <el-button type="primary" @click="dataFormSubmit()" v-if="!isDetail"> 确 定</el-button>
    </span>
    </el-dialog>
</template>
<script>
    import request from '@/utils/request'
    import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
    import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false,
                loading: false,
                isDetail: false,
            dataForm: {
                            title : '',
                        proinfo_mediagossiprecordList:[],
            },
            rules:
            {
            },

        }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {},
        methods: {
				proinfo_mediagossiprecordExist() {
				let isOk = true;
					for(let i=0;i<this.dataForm.proinfo_mediagossiprecordList.length;i++){
						const e = this.dataForm.proinfo_mediagossiprecordList[i];
					}
				return isOk;
			},
                    getproinfo_mediagossiprecordSummaries(param) {
                        const summaryField = ["answer","question"];
                        const { columns, data } = param;
                        const sums = [];
                        columns.forEach((column, index) => {
                            if (index === 0) {
                                sums[index] = '合计';
                                return;
                            }
                            if (!summaryField.includes(column.property)) {
                                sums[index] = '';
                                return;
                            }
                            const values = data.map(item => Number(item[column.property]));
                            if (!values.every(value => isNaN(value))) {
                                sums[index] = values.reduce((prev, curr) => {
                                    const value = Number(curr);
                                    if (!isNaN(value)) {
                                        return prev + curr;
                                    } else {
                                        return prev;
                                    }
                                }, 0);
                            } else {
                                sums[index] = '';
                            }
                        });
                        return sums;
                    },
            clearData(data){
                for (let key in data) {
                    if (data[key] instanceof Array) {
                        data[key] = [];
                    } else if (data[key] instanceof Object) {
                        this.clearData(data[key]);
                    } else {
                        data[key] = "";
                    }
                }
            },
            init(id, isDetail) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.isDetail = isDetail || false;
                this.$nextTick(() => {
                    this.$refs['elForm'].resetFields();
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProInfo_MediaGossipType/'+this.dataForm.id,
                            method: 'get'
                        }).then(res => {
                            this.dataInfo(res.data)
                            this.loading = false
                        });
                    }else{
                       this.clearData(this.dataForm)
                    }
                });
                this.$store.commit('generator/UPDATE_RELATION_DATA', {})
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['elForm'].validate((valid) => {
                    if (valid) {
                            if (!this.proinfo_mediagossiprecordExist()) return
                            this.request()
                    }
                })
            },
            request() {
                var _data =this.dataList()
                if (!this.dataForm.id) {
                    request({
                        url: '/api/example/ProInfo_MediaGossipType',
                        method: 'post',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refresh', true)
                            }
                        })
                    })
                }else{
                    request({
                        url: '/api/example/ProInfo_MediaGossipType/'+this.dataForm.id,
                        method: 'PUT',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refresh', true)
                            }
                        })
                    })
                }
            },
                addproinfo_mediagossiprecordList(){
                    let item = {
                            question:undefined,
                            answer:undefined,
                }
                    this.dataForm.proinfo_mediagossiprecordList.push(item)
                },
                delproinfo_mediagossiprecordList(index) {
                    this.dataForm.proinfo_mediagossiprecordList.splice(index, 1);
                },
            dataList(){
                var _data = JSON.parse(JSON.stringify(this.dataForm));
                    for(let i=0;i<_data.proinfo_mediagossiprecordList.length;i++){
                        var _list = _data.proinfo_mediagossiprecordList[i];
                    }
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                    for(let i=0;i<_dataAll.proinfo_mediagossiprecordList.length;i++){
                        var _list = _dataAll.proinfo_mediagossiprecordList[i];
                    }
                this.dataForm = _dataAll
            },
        },
    }

</script>
