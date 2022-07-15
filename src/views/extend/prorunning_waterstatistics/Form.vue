<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="200px" label-position="left" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="运行方式"  
 prop="operationmode" >
                    <el-radio-group    v-model="dataForm.operationmode"
 size="small" >
                            <el-radio v-for="(item, index) in operationmodeOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="开机时间"  
 prop="opentime" >
                    <el-time-picker    v-model="dataForm.opentime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="关机时间"  
 prop="closetime" >
                    <el-time-picker    v-model="dataForm.closetime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="机组名称"  
 prop="pumpid" >
                    <el-select    v-model="dataForm.pumpid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in pumpidOptions" :key="index" :label="item.PumpName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="引水量"  
 prop="diversionvolume" >
                    <el-input-number    v-model="dataForm.diversionvolume"
 placeholder="数字文本"  :step="1"  controls-position='right' >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="历时"  
 prop="duration" >
                    <el-input-number    v-model="dataForm.duration"
 placeholder="数字文本"  :step="1"  controls-position='right' >

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
                            operationmode : '',
                            opentime : '',
                            closetime : '',
                            pumpid : "",
                            diversionvolume : '',
                            duration : '',
            },
            rules:
            {
                            opentime: [
                                {
                                    required: true,
                                    message: '请选择',
                                    trigger: 'change'
                                },
                        ],
                            closetime: [
                                {
                                    required: true,
                                    message: '请选择',
                                    trigger: 'change'
                                },
                        ],
                            diversionvolume: [
                                {
                                    required: true,
                                    message: '数字文本',
                                    trigger: ["blur","change"]
                                },
                        ],
                            duration: [
                                {
                                    required: true,
                                    message: '数字文本',
                                    trigger: ["blur","change"]
                                },
                        ],
            },
                        operationmodeOptions:[{"fullName":"引水","id":"引水"},{"fullName":"排涝","id":"排涝"}],
                        pumpidOptions:[],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getpumpidOptions();
        },
        mounted() {},
        methods: {
                    getpumpidOptions() {
                        getDataInterfaceRes('306454850680389765').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.pumpidOptions = data
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
                            url: '/api/example/ProRunning_WaterStatistics/'+this.dataForm.id,
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
                        url: '/api/example/ProRunning_WaterStatistics',
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
                        url: '/api/example/ProRunning_WaterStatistics/'+this.dataForm.id,
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
