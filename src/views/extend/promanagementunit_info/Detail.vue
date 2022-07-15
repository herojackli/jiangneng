<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="管理单位名称"  
 prop="manageunitname" >
                        <p>{{dataForm.manageunitname}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位性质"  
 prop="propertyguid" >
                        <p>{{dataForm.propertyguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位地址"  
 prop="manageunitaddress" >
                        <p>{{dataForm.manageunitaddress}}</p>
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
                <el-form-item  label="排序"  
 prop="orderindex" >
                        <p>{{dataForm.orderindex}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位联系电话"  
 prop="manageunitphone" >
                        <p>{{dataForm.manageunitphone}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位传真"  
 prop="manageunitfax" >
                        <p>{{dataForm.manageunitfax}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位负责人"  
 prop="manageunitchargepersonname" >
                        <p>{{dataForm.manageunitchargepersonname}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位负责人联系电话"  
 prop="manageunitchargepersonphone" >
                        <p>{{dataForm.manageunitchargepersonphone}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位负责人联系手机"  
 prop="manageunitchargepersonmobile" >
                        <p>{{dataForm.manageunitchargepersonmobile}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单位职责"  
 prop="departmentduty" >
                        <p>{{dataForm.departmentduty}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单位简介"  
 prop="unitintroduction" >
                        <p>{{dataForm.unitintroduction}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="管理单位附件"  
 prop="unitprofileid" >
                    <HONGAN4D-UploadFz    v-model="dataForm.unitprofileid"
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
                            manageunitname : '',
                            propertyguid : "",
                            manageunitaddress : '',
                            longitude : '',
                            latitude : '',
                            altitude : '',
                            orderindex : '',
                            manageunitphone : '',
                            manageunitfax : '',
                            manageunitchargepersonname : '',
                            manageunitchargepersonphone : '',
                            manageunitchargepersonmobile : '',
                            departmentduty : '',
                            unitintroduction : '',
                            unitprofileid : [],
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
                        _dataAll.unitprofileid = _dataAll.unitprofileid ? JSON.parse( _dataAll.unitprofileid):[]
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProManagementUnit_Info/detail/'+this.dataForm.id,
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
