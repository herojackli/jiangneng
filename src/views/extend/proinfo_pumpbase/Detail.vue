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
                <el-form-item  label="泵组型式"  
 prop="pumptypeenumid" >
                        <p>{{dataForm.pumptypeenumid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="水泵型号"  
 prop="pumpmodel" >
                        <p>{{dataForm.pumpmodel}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="泵组台数"  
 prop="pumpnum" >
                        <p>{{dataForm.pumpnum}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="装机容量"  
 prop="installedcapacity" >
                        <p>{{dataForm.installedcapacity}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设计总流量"  
 prop="totaldesignflow" >
                        <p>{{dataForm.totaldesignflow}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="设计扬程"  
 prop="designhead" >
                        <p>{{dataForm.designhead}}</p>
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
                            pumptypeenumid : "",
                            pumpmodel : '',
                            pumpnum : '',
                            installedcapacity : '',
                            totaldesignflow : '',
                            designhead : '',
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
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProInfo_PumpBase/detail/'+this.dataForm.id,
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
