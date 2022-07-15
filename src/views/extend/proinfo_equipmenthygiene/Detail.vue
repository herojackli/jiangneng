<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="工程ID"  
 prop="projectguid" >
                        <p>{{dataForm.projectguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="包干区名称"  
 prop="lumpsumareaname" >
                        <p>{{dataForm.lumpsumareaname}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="参与人员"  
 prop="participants" >
                        <p>{{dataForm.participants}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="时间"  
 prop="tm" >
                        <p>{{com.hongan4d.dateFormat(dataForm.tm)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="开始前照片"  
 prop="perstartphoto" >
                    <HONGAN4D-UploadImg    v-model="dataForm.perstartphoto"
 disabled
 detailed  :fileSize="5"  sizeUnit="MB"  :limit="9"                 </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="结束照片"  
 prop="endphoto" >
                    <HONGAN4D-UploadImg    v-model="dataForm.endphoto"
 disabled
 detailed  :fileSize="5"  sizeUnit="MB"  :limit="9"                 </HONGAN4D-UploadImg>
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
                            projectguid : "",
                            lumpsumareaname : '',
                            participants : [],
                            tm : '',
                            perstartphoto : [],
                            endphoto : [],
            },

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
                        _dataAll.perstartphoto = _dataAll.perstartphoto ? JSON.parse( _dataAll.perstartphoto):[]
                        _dataAll.endphoto = _dataAll.endphoto ? JSON.parse( _dataAll.endphoto):[]
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProInfo_EquipmentHygiene/detail/'+this.dataForm.id,
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
