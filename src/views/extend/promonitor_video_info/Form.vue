<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="管理单位ID"  
 prop="supplementguid" >
                    <el-select    v-model="dataForm.supplementguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in supplementguidOptions" :key="index" :label="item.ManageUnitName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
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
                <el-form-item  label="视频名称"  
 prop="videoname" >
                    <el-input    v-model="dataForm.videoname"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设备编码"  
 prop="videocode" >
                    <el-input    v-model="dataForm.videocode"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设备IP"  
 prop="videoip" >
                    <el-input    v-model="dataForm.videoip"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频类型"  
 prop="videotypeenumid" >
                    <el-select    v-model="dataForm.videotypeenumid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in videotypeenumidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="是否本地"  
 prop="isvideolocal" >
                    <el-radio-group    v-model="dataForm.isvideolocal"
 size="small" >
                            <el-radio v-for="(item, index) in isvideolocalOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="本地RTMP地址"  
 prop="localrtmpurl" >
                    <el-input    v-model="dataForm.localrtmpurl"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="本地RTSP地址"  
 prop="localrtspurl" >
                    <el-input    v-model="dataForm.localrtspurl"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="本地HLS地址"  
 prop="localhlsurl" >
                    <el-input    v-model="dataForm.localhlsurl"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="分辨率"  
 prop="displaysize" >
                    <el-input    v-model="dataForm.displaysize"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="帧数"  
 prop="frames" >
                    <el-input    v-model="dataForm.frames"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频是否开启"  
 prop="isvideoopen" >
                    <el-switch    v-model="dataForm.isvideoopen"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频路径"  
 prop="videourl" >
                    <el-input    v-model="dataForm.videourl"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频型号"  
 prop="videomodel" >
                    <el-input    v-model="dataForm.videomodel"
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
                <el-form-item  label="X"  
 prop="babylonx" >
                    <el-input-number    v-model="dataForm.babylonx"
 placeholder="数字文本"  :step="1"  :precision="6" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="Y"  
 prop="babylony" >
                    <el-input-number    v-model="dataForm.babylony"
 placeholder="数字文本"  :step="1"  :precision="6" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="Z"  
 prop="babylonz" >
                    <el-input-number    v-model="dataForm.babylonz"
 placeholder="数字文本"  :step="1"  :precision="6" >

                </el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="外部关联字段"  
 prop="stcd" >
                    <el-input    v-model="dataForm.stcd"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
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
                            projectguid : "",
                            videoname : '',
                            videocode : '',
                            videoip : '',
                            videotypeenumid : "",
                            isvideolocal : "true",
                            localrtmpurl : '',
                            localrtspurl : '',
                            localhlsurl : '',
                            displaysize : '',
                            frames : '',
                            isvideoopen : 1,
                            videourl : '',
                            videomodel : '',
                            longitude : '',
                            latitude : '',
                            altitude : '',
                            babylonx : '',
                            babylony : '',
                            babylonz : '',
                            stcd : '',
            },
            rules:
            {
            },
                        supplementguidOptions:[],
                        projectguidOptions:[],
                        videotypeenumidOptions:[],
                        isvideolocalOptions:[{"fullName":"是","id":"true"},{"fullName":"否","id":"false"}],

        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getsupplementguidOptions();
                    this.getprojectguidOptions();
                    this.getvideotypeenumidOptions();
        },
        mounted() {},
        methods: {
                    getsupplementguidOptions() {
                        getDataInterfaceRes('306353102468939909').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.supplementguidOptions = data
                        })
                    },
                    getprojectguidOptions() {
                        getDataInterfaceRes('306039649598439557').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.projectguidOptions = data
                        })
                    },
                    getvideotypeenumidOptions() {
                        getDictionaryDataSelector('306060728333238405').then(res => {
                            this.videotypeenumidOptions = res.data.list
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
                            url: '/api/example/ProMonitor_Video_Info/'+this.dataForm.id,
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
                        url: '/api/example/ProMonitor_Video_Info',
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
                        url: '/api/example/ProMonitor_Video_Info/'+this.dataForm.id,
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
                        _data.isvideoopen = parseInt(_data.isvideoopen)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                        _dataAll.isvideoopen = parseInt( _dataAll.isvideoopen)
                this.dataForm = _dataAll
            },
        },
    }

</script>
