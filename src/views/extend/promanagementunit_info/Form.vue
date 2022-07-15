<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="管理单位名称"  
 prop="manageunitname" >
                    <el-input    v-model="dataForm.manageunitname"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位性质"  
 prop="propertyguid" >
                    <el-select    v-model="dataForm.propertyguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in propertyguidOptions" :key="index" :label="item.PropertyName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位地址"  
 prop="manageunitaddress" >
                    <el-input    v-model="dataForm.manageunitaddress"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="经度"  
 prop="longitude" >
                    <el-input-number    v-model="dataForm.longitude"
 placeholder="数字文本"  :step="1"  :precision="6" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="纬度"  
 prop="latitude" >
                    <el-input-number    v-model="dataForm.latitude"
 placeholder="数字文本"  :step="1"  :precision="6" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="高程"  
 prop="altitude" >
                    <el-input-number    v-model="dataForm.altitude"
 placeholder="数字文本"  :step="1"  :precision="2" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="排序"  
 prop="orderindex" >
                    <el-input-number    v-model="dataForm.orderindex"
 placeholder="数字文本"  :step="1" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位联系电话"  
 prop="manageunitphone" >
                    <el-input    v-model="dataForm.manageunitphone"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位传真"  
 prop="manageunitfax" >
                    <el-input    v-model="dataForm.manageunitfax"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位负责人"  
 prop="manageunitchargepersonname" >
                    <el-input    v-model="dataForm.manageunitchargepersonname"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位负责人联系电话"  
 prop="manageunitchargepersonphone" >
                    <el-input    v-model="dataForm.manageunitchargepersonphone"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位负责人联系手机"  
 prop="manageunitchargepersonmobile" >
                    <el-input    v-model="dataForm.manageunitchargepersonmobile"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单位职责"  
 prop="departmentduty" >
                    <el-input    v-model="dataForm.departmentduty"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单位简介"  
 prop="unitintroduction" >
                    <el-input    v-model="dataForm.unitintroduction"
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位附件"  
 prop="unitprofileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.unitprofileid"
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
                            manageunitname : '',
                            propertyguid : "",
                            manageunitaddress : '',
                            longitude : '',
                            latitude : '',
                            altitude : '',
                            orderindex : '',
                            manageunitphone : '',
                            manageunitfax : '',
                            manageunitchargepersonname : '',
                            manageunitchargepersonphone : '',
                            manageunitchargepersonmobile : '',
                            departmentduty : '',
                            unitintroduction : '',
                            unitprofileid : [],
            },
            rules:
            {
                            manageunitphone: [
                        ],
                            manageunitchargepersonphone: [
                        ],
                            manageunitchargepersonmobile: [
                        ],
            },
                        propertyguidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getpropertyguidOptions();
        },
        mounted() {},
        methods: {
                    getpropertyguidOptions() {
                        getDataInterfaceRes('306352343710957701').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.propertyguidOptions = data
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
                            url: '/api/example/ProManagementUnit_Info/'+this.dataForm.id,
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
                        url: '/api/example/ProManagementUnit_Info',
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
                        url: '/api/example/ProManagementUnit_Info/'+this.dataForm.id,
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
                        _data.unitprofileid = JSON.stringify(_data.unitprofileid)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                        _dataAll.unitprofileid = JSON.parse( _dataAll.unitprofileid)
                this.dataForm = _dataAll
            },
        },
    }

</script>
