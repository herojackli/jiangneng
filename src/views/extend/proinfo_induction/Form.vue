<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="入职时间"  
 prop="entrytime" >
                    <el-date-picker    v-model="dataForm.entrytime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="date"  format="yyyy-MM-dd"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="姓名"  
 prop="username" >
                    <el-input    v-model="dataForm.username"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="性别"  
 prop="sexenumid" >
                    <el-select    v-model="dataForm.sexenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in sexenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="籍贯"  
 prop="birthplace" >
                    <HONGAN4D-Address    v-model="dataForm.birthplace"
 placeholder="请选择"  clearable  :level=2 >

                </HONGAN4D-Address>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位"  
 prop="supplementguid" >
                    <el-select    v-model="dataForm.supplementguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in supplementguidOptions" :key="index" :label="item.ManageUnitName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="用人部门"  
 prop="departmentid" >
                    <dep-select    v-model="dataForm.departmentid"
 placeholder="请选择"  clearable >

                </dep-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="岗位"  
 prop="postid" >
                    <pos-select    v-model="dataForm.postid"
 placeholder="请选择"  clearable >

                </pos-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="手机号"  
 prop="mobile" >
                    <el-input    v-model="dataForm.mobile"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="学历"  
 prop="educationenumid" >
                    <el-radio-group    v-model="dataForm.educationenumid"
 size="small" >
                            <el-radio v-for="(item, index) in educationenumidOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="毕业院校"  
 prop="graduatedschool" >
                    <el-input    v-model="dataForm.graduatedschool"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="证书资料"  
 prop="certificateprofileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.certificateprofileid"
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
                            entrytime : '',
                            username : '',
                            sexenumid : "",
                            birthplace : [],
                            supplementguid : "",
                            departmentid : '',
                            postid : '',
                            mobile : '',
                            educationenumid : "b620b397f3ec44f083b0df9fbc2f3ba7",
                            graduatedschool : '',
                            certificateprofileid : [],
            },
            rules:
            {
                            mobile: [
                        ],
            },
                        sexenumidOptions:[],
                        supplementguidOptions:[],
                        educationenumidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getsexenumidOptions();
                    this.getsupplementguidOptions();
                    this.geteducationenumidOptions();
        },
        mounted() {},
        methods: {
                    getsexenumidOptions() {
                        getDictionaryDataSelector('963255a34ea64a2584c5d1ba269c1fe6').then(res => {
                            this.sexenumidOptions = res.data.list
                        })
                    },
                    getsupplementguidOptions() {
                        getDataInterfaceRes('306353102468939909').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.supplementguidOptions = data
                        })
                    },
                    geteducationenumidOptions() {
                        getDictionaryDataSelector('6a6d6fb541b742fbae7e8888528baa16').then(res => {
                            this.educationenumidOptions = res.data.list
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
                            url: '/api/example/ProInfo_Induction/'+this.dataForm.id,
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
                        url: '/api/example/ProInfo_Induction',
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
                        url: '/api/example/ProInfo_Induction/'+this.dataForm.id,
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
                        _data.birthplace = JSON.stringify(_data.birthplace)
                        _data.certificateprofileid = JSON.stringify(_data.certificateprofileid)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                        _dataAll.birthplace = JSON.parse( _dataAll.birthplace)
                        _dataAll.certificateprofileid = JSON.parse( _dataAll.certificateprofileid)
                this.dataForm = _dataAll
            },
        },
    }

</script>
