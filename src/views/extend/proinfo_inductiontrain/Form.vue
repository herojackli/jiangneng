<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="培训标题"  
 prop="title" >
                    <el-input    v-model="dataForm.title"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训类型"  
 prop="traintypeenumid" >
                    <el-select    v-model="dataForm.traintypeenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in traintypeenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训人员"  
 prop="trainperosonids" >
                    <user-select    v-model="dataForm.trainperosonids"
 placeholder="请选择"  clearable  :multiple="true" >

                </user-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训讲师"  
 prop="traininstructor" >
                    <el-input    v-model="dataForm.traininstructor"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="开始时间"  
 prop="starttime" >
                    <el-date-picker    v-model="dataForm.starttime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="date"  format="yyyy-MM-dd"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="结束时间"  
 prop="endtime" >
                    <el-date-picker    v-model="dataForm.endtime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="date"  format="yyyy-MM-dd"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="年份"  
 prop="year" >
                    <el-date-picker    v-model="dataForm.year"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="year"  format="yyyy"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训地点"  
 prop="trainsit" >
                    <el-input    v-model="dataForm.trainsit"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训内容"  
 prop="content" >
                    <el-input    v-model="dataForm.content"
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="附件"  
 prop="profileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.profileid"
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
                            title : '',
                            traintypeenumid : "305729148507127877",
                            trainperosonids : [],
                            traininstructor : '',
                            starttime : '',
                            endtime : '',
                            year : '',
                            trainsit : '',
                            content : '',
                            profileid : [],
            },
            rules:
            {
            },
                        traintypeenumidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.gettraintypeenumidOptions();
        },
        mounted() {},
        methods: {
                    gettraintypeenumidOptions() {
                        getDictionaryDataSelector('305728080410837061').then(res => {
                            this.traintypeenumidOptions = res.data.list
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
                            url: '/api/example/ProInfo_InductionTrain/'+this.dataForm.id,
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
                        url: '/api/example/ProInfo_InductionTrain',
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
                        url: '/api/example/ProInfo_InductionTrain/'+this.dataForm.id,
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
                            _data.trainperosonids = JSON.stringify(_data.trainperosonids)
                        _data.profileid = JSON.stringify(_data.profileid)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                            _dataAll.trainperosonids = JSON.parse( _dataAll.trainperosonids)
                        _dataAll.profileid = JSON.parse( _dataAll.profileid)
                this.dataForm = _dataAll
            },
        },
    }

</script>
