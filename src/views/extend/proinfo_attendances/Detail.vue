<template>
    <el-dialog title="详情" :close-on-click-modal="false" append-to-body :visible.sync="visible"
        class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
            <el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right">
                <template v-if="!loading">
                    <el-col :span="24">
                        <el-form-item label="年份" prop="year">
                            <p>{{ com.hongan4d.dateFormat(dataForm.year) }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="月份" prop="month">
                            <p>{{ com.hongan4d.dateFormat(dataForm.month) }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="用户id" prop="userid">
                            <p>{{ dataForm.userid }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="上班天数" prop="workdays">
                            <p>{{ dataForm.workdays }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="迟到次数" prop="latenum">
                            <p>{{ dataForm.latenum }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="早退次数" prop="leaveearlynum">
                            <p>{{ dataForm.leaveearlynum }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="请假天数" prop="leavedays">
                            <p>{{ dataForm.leavedays }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="旷工天数" prop="absenteeismdays">
                            <p>{{ dataForm.absenteeismdays }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="附件" prop="profileid">
                            <HONGAN4D-UploadFz v-model="dataForm.profileid" disabled detailed :fileSize="5"
                                sizeUnit="MB" :limit="9" buttonText="点击上传" </HONGAN4D-UploadFz>
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
                year: '',
                month: '',
                userid: '',
                workdays: '',
                latenum: '',
                leaveearlynum: '',
                leavedays: '',
                absenteeismdays: '',
                profileid: [],
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
                        url: '/api/example/ProInfo_Attendances/detail/' + this.dataForm.id,
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
