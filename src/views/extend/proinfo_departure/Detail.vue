<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="离职员工姓名"  
 prop="userid" >
                        <p>{{dataForm.userid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位"  
 prop="supplementguid" >
                        <p>{{dataForm.supplementguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="所属部门"  
 prop="departmentid" >
                        <p>{{dataForm.departmentid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="岗位"  
 prop="postid" >
                        <p>{{dataForm.postid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="入职时间"  
 prop="entrytime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.entrytime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="离职时间"  
 prop="departuretime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.departuretime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="交接人员"  
 prop="handoverid" >
                        <p>{{dataForm.handoverid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="劳动合同开始时间"  
 prop="laborcontractstarttime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.laborcontractstarttime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="劳动合同结束时间"  
 prop="laborcontractendtime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.laborcontractendtime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="离职原因"  
 prop="departurereason" >
                        <p>{{dataForm.departurereason}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="所需交接事项"  
 prop="handovermatter" >
                        <p>{{dataForm.handovermatter}}</p>
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
                            userid : '',
                            supplementguid : "",
                            departmentid : '',
                            postid : '',
                            entrytime : '',
                            departuretime : '',
                            handoverid : '',
                            laborcontractstarttime : '',
                            laborcontractendtime : '',
                            departurereason : '',
                            handovermatter : '',
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
                            url: '/api/example/ProInfo_Departure/detail/'+this.dataForm.id,
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
