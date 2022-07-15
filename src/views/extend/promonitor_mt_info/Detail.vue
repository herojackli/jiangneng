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
 prop="proinfoguid" >
                        <p>{{dataForm.proinfoguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="主变名称"  
 prop="mtname" >
                        <p>{{dataForm.mtname}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="运行状态"  
 prop="runstatusenumid" >
                        <p>{{dataForm.runstatusenumid}}</p>
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
                <el-form-item  label="图片"  
 prop="profileid" >
                    <HONGAN4D-UploadImg    v-model="dataForm.profileid"
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
                            supplementguid : "",
                            proinfoguid : "",
                            mtname : '',
                            runstatusenumid : "",
                            longitude : '',
                            latitude : '',
                            orderindex : '',
                            profileid : [],
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
                        _dataAll.profileid = _dataAll.profileid ? JSON.parse( _dataAll.profileid):[]
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProMonitor_MT_Info/detail/'+this.dataForm.id,
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
