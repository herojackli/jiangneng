<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="培训标题"  
 prop="title" >
                        <p>{{dataForm.title}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训类型"  
 prop="traintypeenumid" >
                        <p>{{dataForm.traintypeenumid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训人员"  
 prop="trainperosonids" >
                        <p>{{dataForm.trainperosonids}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训讲师"  
 prop="traininstructor" >
                        <p>{{dataForm.traininstructor}}</p>
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
                <el-form-item  label="年份"  
 prop="year" >
                        <p>{{com.hongan4d.dateFormat(dataForm.year)}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训地点"  
 prop="trainsit" >
                        <p>{{dataForm.trainsit}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="培训内容"  
 prop="content" >
                        <p>{{dataForm.content}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="附件"  
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
                            title : '',
                            traintypeenumid : "305729148507127877",
                            trainperosonids : [],
                            traininstructor : '',
                            starttime : '',
                            endtime : '',
                            year : '',
                            trainsit : '',
                            content : '',
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
                            url: '/api/example/ProInfo_InductionTrain/detail/'+this.dataForm.id,
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
