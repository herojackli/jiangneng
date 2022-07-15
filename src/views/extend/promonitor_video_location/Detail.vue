<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="下拉选择"  
 prop="supplementguid" >
                        <p>{{dataForm.supplementguid}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="位置名称"  
 prop="localename" >
                        <p>{{dataForm.localename}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="排序"  
 prop="orderindex" >
                        <p>{{dataForm.orderindex}}</p>
                </el-form-item>
            </el-col>
    <el-col :span="24"  >
    <el-form-item label-width="0">
            <div class="HONGAN4D-common-title">
                <h2>关联摄像头</h2>
            </div>
    <el-table :data="dataForm.promonitor_video_location_infoList" size='mini'   >
        <el-table-column type="index" width="50" label="序号" align="center" />
            <el-table-column prop="videoinfoguid" label="关联摄像头">
            <template slot-scope="scope">
                            <p>{{scope.row.videoinfoguid}}</p>
        </template>
        </el-table-column>
    </el-table>
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
                            localename : '',
                            orderindex : '',
                        promonitor_video_location_infoList:[],
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
                for(let i=0;i<_dataAll.promonitor_video_location_infoList.length;i++){
                    var _list = _dataAll.promonitor_video_location_infoList[i];
                }
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProMonitor_Video_Location/detail/'+this.dataForm.id,
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
