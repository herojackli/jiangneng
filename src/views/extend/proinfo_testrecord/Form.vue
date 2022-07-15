<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="工程ID"  
 prop="projectguid" >
                    <el-select    v-model="dataForm.projectguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in projectguidOptions" :key="index" :label="item.ProName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="记录类型"  
 prop="recordtypeenumid" >
                    <el-select    v-model="dataForm.recordtypeenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in recordtypeenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="检查日期"  
 prop="inspectiondate" >
                    <el-date-picker    v-model="dataForm.inspectiondate"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="date"  format="yyyy-MM-dd"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="负责人"  
 prop="principalpersonid" >
                    <user-select    v-model="dataForm.principalpersonid"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="试验人员"  
 prop="inspectorids" >
                    <user-select    v-model="dataForm.inspectorids"
 placeholder="请选择"  clearable  :multiple="true" >

                </user-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="试验结论"  
 prop="inspectionresult" >
                    <el-input    v-model="dataForm.inspectionresult"
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="相关附件"  
 prop="inspectionprofileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.inspectionprofileid"
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >

                </HONGAN4D-UploadFz>
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
                            projectguid : "",
                            recordtypeenumid : "305981642600611973",
                            inspectiondate : '',
                            principalpersonid : '',
                            inspectorids : [],
                            inspectionresult : '',
                            inspectionprofileid : [],
            },
            rules:
            {
            },
                        projectguidOptions:[],
                        recordtypeenumidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getprojectguidOptions();
                    this.getrecordtypeenumidOptions();
        },
        mounted() {},
        methods: {
                    getprojectguidOptions() {
                        getDataInterfaceRes('306039649598439557').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.projectguidOptions = data
                        })
                    },
                    getrecordtypeenumidOptions() {
                        getDictionaryDataSelector('305981455903752325').then(res => {
                            this.recordtypeenumidOptions = res.data.list
                        })
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
                            url: '/api/example/ProInfo_TestRecord/'+this.dataForm.id,
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
                            this.request()
                    }
                })
            },
            request() {
                var _data =this.dataList()
                if (!this.dataForm.id) {
                    request({
                        url: '/api/example/ProInfo_TestRecord',
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
                        url: '/api/example/ProInfo_TestRecord/'+this.dataForm.id,
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
            dataList(){
                var _data = JSON.parse(JSON.stringify(this.dataForm));
                            _data.inspectorids = JSON.stringify(_data.inspectorids)
                        _data.inspectionprofileid = JSON.stringify(_data.inspectionprofileid)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                            _dataAll.inspectorids = JSON.parse( _dataAll.inspectorids)
                        _dataAll.inspectionprofileid = JSON.parse( _dataAll.inspectionprofileid)
                this.dataForm = _dataAll
            },
        },
    }

</script>
