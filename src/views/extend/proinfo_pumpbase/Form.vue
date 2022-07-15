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
                <el-form-item  label="泵组型式"  
 prop="pumptypeenumid" >
                    <el-select    v-model="dataForm.pumptypeenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in pumptypeenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="水泵型号"  
 prop="pumpmodel" >
                    <el-input    v-model="dataForm.pumpmodel"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="泵组台数"  
 prop="pumpnum" >
                    <el-input-number    v-model="dataForm.pumpnum"
 placeholder="数字文本"  :step="1" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="装机容量"  
 prop="installedcapacity" >
                    <el-input-number    v-model="dataForm.installedcapacity"
 placeholder="数字文本"  :step="1" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设计总流量"  
 prop="totaldesignflow" >
                    <el-input-number    v-model="dataForm.totaldesignflow"
 placeholder="数字文本"  :step="1" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设计扬程"  
 prop="designhead" >
                    <el-input-number    v-model="dataForm.designhead"
 placeholder="数字文本"  :step="1" >

                </el-input-number>
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
                            pumptypeenumid : "",
                            pumpmodel : '',
                            pumpnum : '',
                            installedcapacity : '',
                            totaldesignflow : '',
                            designhead : '',
            },
            rules:
            {
            },
                        projectguidOptions:[],
                        pumptypeenumidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getprojectguidOptions();
                    this.getpumptypeenumidOptions();
        },
        mounted() {},
        methods: {
                    getprojectguidOptions() {
                        getDataInterfaceRes('306039649598439557').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.projectguidOptions = data
                        })
                    },
                    getpumptypeenumidOptions() {
                        getDictionaryDataSelector('306751869638672581').then(res => {
                            this.pumptypeenumidOptions = res.data.list
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
                            url: '/api/example/ProInfo_PumpBase/'+this.dataForm.id,
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
                        url: '/api/example/ProInfo_PumpBase',
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
                        url: '/api/example/ProInfo_PumpBase/'+this.dataForm.id,
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
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                this.dataForm = _dataAll
            },
        },
    }

</script>
