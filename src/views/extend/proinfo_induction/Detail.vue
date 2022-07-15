<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="入职时间"  
 prop="entrytime" >
                        <p>{{com.hongan4d.dateFormat(dataForm.entrytime)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="姓名"  
 prop="username" >
                        <p>{{dataForm.username}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="性别"  
 prop="sexenumid" >
                        <p>{{dataForm.sexenumid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="籍贯"  
 prop="birthplace" >
                        <p>{{dataForm.birthplace}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位"  
 prop="supplementguid" >
                        <p>{{dataForm.supplementguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="用人部门"  
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
                <el-form-item  label="手机号"  
 prop="mobile" >
                        <p>{{dataForm.mobile}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="学历"  
 prop="educationenumid" >
                        <p>{{dataForm.educationenumid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="毕业院校"  
 prop="graduatedschool" >
                        <p>{{dataForm.graduatedschool}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="证书资料"  
 prop="certificateprofileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.certificateprofileid"
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
                            entrytime : '',
                            username : '',
                            sexenumid : "",
                            birthplace : [],
                            supplementguid : "",
                            departmentid : '',
                            postid : '',
                            mobile : '',
                            educationenumid : "b620b397f3ec44f083b0df9fbc2f3ba7",
                            graduatedschool : '',
                            certificateprofileid : [],
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
                        _dataAll.certificateprofileid = _dataAll.certificateprofileid ? JSON.parse( _dataAll.certificateprofileid):[]
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProInfo_Induction/detail/'+this.dataForm.id,
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
