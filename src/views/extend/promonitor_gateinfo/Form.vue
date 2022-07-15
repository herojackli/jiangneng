<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
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
                <el-form-item  label="工程ID"  
 prop="proinfoguid" >
                    <el-select    v-model="dataForm.proinfoguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in proinfoguidOptions" :key="index" :label="item.ProName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="闸门名称"  
 prop="gatename" >
                    <el-input    v-model="dataForm.gatename"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="测站编码"  
 prop="stcd" >
                    <el-input    v-model="dataForm.stcd"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="闸门类型"  
 prop="gatetypeenumid" >
                    <el-select    v-model="dataForm.gatetypeenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in gatetypeenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
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
                <el-form-item  label="排序"  
 prop="orderindex" >
                    <el-input-number    v-model="dataForm.orderindex"
 placeholder="数字文本"  :step="1" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="闸门盖高度"  
 prop="gateheight" >
                    <el-input-number    v-model="dataForm.gateheight"
 placeholder="数字文本"  :step="1"  :precision="2" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="UA"  
 prop="ua" >
                    <el-input    v-model="dataForm.ua"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="UB"  
 prop="ub" >
                    <el-input    v-model="dataForm.ub"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="UC"  
 prop="uc" >
                    <el-input    v-model="dataForm.uc"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="功率"  
 prop="p" >
                    <el-input    v-model="dataForm.p"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="高程"  
 prop="altitude" >
                    <el-input    v-model="dataForm.altitude"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blender编码"  
 prop="blendercode" >
                    <el-input    v-model="dataForm.blendercode"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blenderX坐标"  
 prop="blenderx" >
                    <el-input-number    v-model="dataForm.blenderx"
 placeholder="数字文本"  :step="1"  :precision="6" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blenderY坐标"  
 prop="blendery" >
                    <el-input-number    v-model="dataForm.blendery"
 placeholder="数字文本"  :step="1"  :precision="6" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blenderZ坐标"  
 prop="blenderz" >
                    <el-input-number    v-model="dataForm.blenderz"
 placeholder="数字文本"  :step="1"  :precision="6" >

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
                            supplementguid : "",
                            proinfoguid : "",
                            gatename : '',
                            stcd : '',
                            gatetypeenumid : "",
                            longitude : '',
                            latitude : '',
                            orderindex : '',
                            gateheight : '',
                            ua : '',
                            ub : '',
                            uc : '',
                            p : '',
                            altitude : '',
                            blendercode : '',
                            blenderx : '',
                            blendery : '',
                            blenderz : '',
            },
            rules:
            {
            },
                        supplementguidOptions:[],
                        proinfoguidOptions:[],
                        gatetypeenumidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getsupplementguidOptions();
                    this.getproinfoguidOptions();
                    this.getgatetypeenumidOptions();
        },
        mounted() {},
        methods: {
                    getsupplementguidOptions() {
                        getDataInterfaceRes('306353102468939909').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.supplementguidOptions = data
                        })
                    },
                    getproinfoguidOptions() {
                        getDataInterfaceRes('306039649598439557').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.proinfoguidOptions = data
                        })
                    },
                    getgatetypeenumidOptions() {
                        getDictionaryDataSelector('306061602317140101').then(res => {
                            this.gatetypeenumidOptions = res.data.list
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
                            url: '/api/example/ProMonitor_GateInfo/'+this.dataForm.id,
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
                        url: '/api/example/ProMonitor_GateInfo',
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
                        url: '/api/example/ProMonitor_GateInfo/'+this.dataForm.id,
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
