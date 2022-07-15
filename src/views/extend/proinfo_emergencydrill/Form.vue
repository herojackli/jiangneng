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
                            <el-option v-for="(item, index) in projectguidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="演练类型"  
 prop="drilltypeenumid" >
                    <el-select    v-model="dataForm.drilltypeenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in drilltypeenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
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
                <el-form-item  label="负责人"  
 prop="principalpersonid" >
                    <user-select    v-model="dataForm.principalpersonid"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="参与人员"  
 prop="participants" >
                    <user-select    v-model="dataForm.participants"
 placeholder="请选择"  clearable  :multiple="true" >

                </user-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="演练内容"  
 prop="drillcontent" >
                    <el-input    v-model="dataForm.drillcontent"
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="相关附件"  
 prop="profileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.profileid"
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >

                </HONGAN4D-UploadFz>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="归档时间"  
 prop="archivetime" >
                    <el-date-picker    v-model="dataForm.archivetime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="date"  format="yyyy-MM-dd"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="归档状态"  
 prop="archivestatusenumid" >
                    <el-select    v-model="dataForm.archivestatusenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in archivestatusenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
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
                            projectguid : "江能建设工程",
                            drilltypeenumid : "305782660117037125",
                            starttime : '',
                            endtime : '',
                            principalpersonid : '',
                            participants : [],
                            drillcontent : '',
                            profileid : [],
                            archivetime : '',
                            archivestatusenumid : "",
            },
            rules:
            {
            },
                        projectguidOptions:[{"fullName":"工程","id":"江能建设工程"}],
                        drilltypeenumidOptions:[],
                        archivestatusenumidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getdrilltypeenumidOptions();
                    this.getarchivestatusenumidOptions();
        },
        mounted() {},
        methods: {
                    getdrilltypeenumidOptions() {
                        getDictionaryDataSelector('305782026810687557').then(res => {
                            this.drilltypeenumidOptions = res.data.list
                        })
                    },
                    getarchivestatusenumidOptions() {
                        getDictionaryDataSelector('305773247255806021').then(res => {
                            this.archivestatusenumidOptions = res.data.list
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
                            url: '/api/example/ProInfo_EmergencyDrill/'+this.dataForm.id,
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
                        url: '/api/example/ProInfo_EmergencyDrill',
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
                        url: '/api/example/ProInfo_EmergencyDrill/'+this.dataForm.id,
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
                            _data.participants = JSON.stringify(_data.participants)
                        _data.profileid = JSON.stringify(_data.profileid)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                            _dataAll.participants = JSON.parse( _dataAll.participants)
                        _dataAll.profileid = JSON.parse( _dataAll.profileid)
                this.dataForm = _dataAll
            },
        },
    }

</script>
