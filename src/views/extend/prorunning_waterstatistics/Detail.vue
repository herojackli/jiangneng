<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="200px" label-position="left" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="运行方式"  
 prop="operationmode" >
                         <p>{{ dataForm.operationmode | dynamicText(operationmodeOptions) }} </p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="开机时间"  
 prop="opentime" >
                        <p>{{dataForm.opentime}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="关机时间"  
 prop="closetime" >
                        <p>{{dataForm.closetime}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="机组名称"  
 prop="pumpid" >
                        <p>{{dataForm.pumpid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="引水量"  
 prop="diversionvolume" >
                        <p>{{dataForm.diversionvolume}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="历时"  
 prop="duration" >
                        <p>{{dataForm.duration}}</p>
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
                            operationmode : '',
                            opentime : '',
                            closetime : '',
                            pumpid : "",
                            diversionvolume : '',
                            duration : '',
            },
                                operationmodeOptions:[{"fullName":"引水","id":"引水"},{"fullName":"排涝","id":"排涝"}],

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
                            url: '/api/example/ProRunning_WaterStatistics/detail/'+this.dataForm.id,
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
