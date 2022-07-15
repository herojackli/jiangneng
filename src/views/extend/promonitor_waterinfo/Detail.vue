<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="管理单位"  
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
                <el-form-item  label="测站名称"  
 prop="stnm" >
                        <p>{{dataForm.stnm}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="测站编码"  
 prop="stcd" >
                        <p>{{dataForm.stcd}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="测站类型"  
 prop="stationTypeenumid" >
                         <p>{{ dataForm.stationTypeenumid | dynamicText(stationTypeenumidOptions) }} </p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="行政区划"  
 prop="adcd" >
                        <p>{{dataForm.adcd}}</p>
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
            <el-col :span="24" >
                <el-form-item  label="排序"  
 prop="orderindex" >
                        <p>{{dataForm.orderindex}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="高程"  
 prop="altitude" >
                        <p>{{dataForm.altitude}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blender编码"  
 prop="blendercode" >
                        <p>{{dataForm.blendercode}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blenderX坐标"  
 prop="blenderx" >
                        <p>{{dataForm.blenderx}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blenderY坐标"  
 prop="blendery" >
                        <p>{{dataForm.blendery}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="blenderZ坐标"  
 prop="blenderz" >
                        <p>{{dataForm.blenderz}}</p>
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
                            stnm : '',
                            stcd : '',
                            stationTypeenumid : "",
                            adcd : [],
                            longitude : '',
                            latitude : '',
                            orderindex : '',
                            altitude : '',
                            blendercode : '',
                            blenderx : '',
                            blendery : '',
                            blenderz : '',
            },
                                stationTypeenumidOptions:[{"fullName":"选项一","id":"1"},{"fullName":"选项二","id":"2"}],

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
                            url: '/api/example/ProMonitor_WaterInfo/detail/'+this.dataForm.id,
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
