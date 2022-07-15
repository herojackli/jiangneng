<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="管理单位ID"  
 prop="supplementguid" >
                        <p>{{dataForm.supplementguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="工程ID"  
 prop="projectguid" >
                        <p>{{dataForm.projectguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频名称"  
 prop="videoname" >
                        <p>{{dataForm.videoname}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设备编码"  
 prop="videocode" >
                        <p>{{dataForm.videocode}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设备IP"  
 prop="videoip" >
                        <p>{{dataForm.videoip}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频类型"  
 prop="videotypeenumid" >
                        <p>{{dataForm.videotypeenumid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="是否本地"  
 prop="isvideolocal" >
                         <p>{{ dataForm.isvideolocal | dynamicText(isvideolocalOptions) }} </p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="本地RTMP地址"  
 prop="localrtmpurl" >
                        <p>{{dataForm.localrtmpurl}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="本地RTSP地址"  
 prop="localrtspurl" >
                        <p>{{dataForm.localrtspurl}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="本地HLS地址"  
 prop="localhlsurl" >
                        <p>{{dataForm.localhlsurl}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="分辨率"  
 prop="displaysize" >
                        <p>{{dataForm.displaysize}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="帧数"  
 prop="frames" >
                        <p>{{dataForm.frames}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频是否开启"  
 prop="isvideoopen" >
                        <p>{{dataForm.isvideoopen}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频路径"  
 prop="videourl" >
                        <p>{{dataForm.videourl}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="视频型号"  
 prop="videomodel" >
                        <p>{{dataForm.videomodel}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="经度"  
 prop="longitude" >
                        <p>{{dataForm.longitude}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="纬度"  
 prop="latitude" >
                        <p>{{dataForm.latitude}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="高程"  
 prop="altitude" >
                        <p>{{dataForm.altitude}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="X"  
 prop="babylonx" >
                        <p>{{dataForm.babylonx}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="Y"  
 prop="babylony" >
                        <p>{{dataForm.babylony}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="Z"  
 prop="babylonz" >
                        <p>{{dataForm.babylonz}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="外部关联字段"  
 prop="stcd" >
                        <p>{{dataForm.stcd}}</p>
                </el-form-item>
            </el-col>
    </template>
</el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false"> 取 消</el-button>
    </span>
    </el-dialog>
</template>
<script>
    import request from '@/utils/request'
    import PrintBrowse from '@/components/PrintBrowse'
    import hongan4d from '@/utils/hongan4d'
    export default {
        components: {PrintBrowse},
        props: [],
        data() {
            return {
                visible: false,
                loading: false,
                printBrowseVisible: false,
                printId: '',
            dataForm: {
                id :'',
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
                                isvideolocalOptions:[{"fullName":"是","id":"true"},{"fullName":"否","id":"false"}],

        }
        },
        computed: {},
        watch: {},
        created() {

        },
        mounted() {},
        methods: {
            dataInfo(dataAll){
                let _dataAll =dataAll
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProMonitor_Video_Info/detail/'+this.dataForm.id,
                            method: 'get'
                        }).then(res => {
                            this.dataInfo(res.data)
                            this.loading = false
                        })
                    }

                })
            },
        },
    }

</script>
