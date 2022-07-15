<template>
    <el-dialog title="详情" :close-on-click-modal="false" append-to-body :visible.sync="visible"
        class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
            <el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right">
                <template v-if="!loading">
                    <el-col :span="24">
                        <el-form-item label="制度名称" prop="systemname">
                            <p>{{ dataForm.systemname }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="封面图片" prop="coverprofileid">
                            <HONGAN4D-UploadImg v-model="dataForm.coverprofileid" disabled detailed :fileSize="5"
                                sizeUnit="MB" :limit="9"></HONGAN4D-UploadImg> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="附件" prop="profileid">
                            <HONGAN4D-UploadFz v-model="dataForm.profileid" disabled detailed :fileSize="5"
                                sizeUnit="MB" :limit="9" buttonText="点击上传"></HONGAN4D-UploadFz>
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
    components: { PrintBrowse },
    props: [],
    data() {
        return {
            visible: false,
            loading: false,
            printBrowseVisible: false,
            printId: '',
            dataForm: {
                id: '',
                systemname: '',
                coverprofileid: [],
                profileid: [],
                creationtime: "",
                creatoruserid: "",
            },

        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() { },
    methods: {
        dataInfo(dataAll) {
            let _dataAll = dataAll
            _dataAll.coverprofileid = _dataAll.coverprofileid ? JSON.parse(_dataAll.coverprofileid) : []
            _dataAll.profileid = _dataAll.profileid ? JSON.parse(_dataAll.profileid) : []
            this.dataForm = _dataAll
        },

        init(id) {
            this.dataForm.id = id || 0;
            this.visible = true;
            this.$nextTick(() => {
                if (this.dataForm.id) {
                    this.loading = true
                    request({
                        url: '/api/example/ProInfo_System/detail/' + this.dataForm.id,
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
