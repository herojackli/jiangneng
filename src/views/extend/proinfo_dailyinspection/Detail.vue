<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="工程"  
 prop="projectguid" >
                        <p>{{dataForm.projectguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="记录类型"  
 prop="recordtypeenumid" >
                        <p>{{dataForm.recordtypeenumid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="检查日期"  
 prop="inspectiondate" >
                        <p>{{com.hongan4d.dateFormat(dataForm.inspectiondate)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="负责人"  
 prop="principalpersonid" >
                        <p>{{dataForm.principalpersonid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="检查人员"  
 prop="inspectorids" >
                        <p>{{dataForm.inspectorids}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="检查结论"  
 prop="inspectionresult" >
                        <p>{{dataForm.inspectionresult}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="检查附件"  
 prop="inspectionprofileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.inspectionprofileid"
 disabled
 detailed  :fileSize="5"  sizeUnit="MB"  :limit="9"  buttonText="点击上传"                 </HONGAN4D-UploadFz>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="处理结果"  
 prop="handleresult" >
                        <p>{{dataForm.handleresult}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="处理附件"  
 prop="handleprofileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.handleprofileid"
 disabled
 detailed  :fileSize="5"  sizeUnit="MB"  :limit="9"  buttonText="点击上传"                 </HONGAN4D-UploadFz>
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
                            recordtypeenumid : "305981556973895813",
                            inspectiondate : '',
                            principalpersonid : '',
                            inspectorids : [],
                            inspectionresult : '',
                            inspectionprofileid : [],
                            handleresult : '',
                            handleprofileid : [],
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
                        _dataAll.inspectionprofileid = _dataAll.inspectionprofileid ? JSON.parse( _dataAll.inspectionprofileid):[]
                        _dataAll.handleprofileid = _dataAll.handleprofileid ? JSON.parse( _dataAll.handleprofileid):[]
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProInfo_DailyInspection/detail/'+this.dataForm.id,
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
