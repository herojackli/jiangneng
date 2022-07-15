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
                         <p>{{ dataForm.projectguid | dynamicText(projectguidOptions) }} </p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="演练类型"  
 prop="drilltypeenumid" >
                        <p>{{dataForm.drilltypeenumid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="开始时间"  
 prop="starttime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.starttime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="结束时间"  
 prop="endtime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.endtime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="负责人"  
 prop="principalpersonid" >
                        <p>{{dataForm.principalpersonid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="参与人员"  
 prop="participants" >
                        <p>{{dataForm.participants}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="演练内容"  
 prop="drillcontent" >
                        <p>{{dataForm.drillcontent}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="相关附件"  
 prop="profileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.profileid"
 disabled
 detailed  :fileSize="5"  sizeUnit="MB"  :limit="9"  buttonText="点击上传"                 </HONGAN4D-UploadFz>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="归档时间"  
 prop="archivetime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.archivetime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="归档状态"  
 prop="archivestatusenumid" >
                        <p>{{dataForm.archivestatusenumid}}</p>
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
                            projectguid : "江能建设工程",
                            drilltypeenumid : "305782660117037125",
                            starttime : '',
                            endtime : '',
                            principalpersonid : '',
                            participants : [],
                            drillcontent : '',
                            profileid : [],
                            archivetime : '',
                            archivestatusenumid : "",
            },
                                projectguidOptions:[{"fullName":"工程","id":"江能建设工程"}],

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
                            url: '/api/example/ProInfo_EmergencyDrill/detail/'+this.dataForm.id,
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
