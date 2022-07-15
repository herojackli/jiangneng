<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="标题"  
 prop="title" >
                        <p>{{dataForm.title}}</p>
                </el-form-item>
            </el-col>
    <el-col :span="24"  >
    <el-form-item label-width="0">
            <div class="HONGAN4D-common-title">
                <h2>相关问答</h2>
            </div>
    <el-table :data="dataForm.proinfo_mediagossiprecordList" size='mini'   show-summary :summary-method="getproinfo_mediagossiprecordSummaries"  >
        <el-table-column type="index" width="50" label="序号" align="center" />
            <el-table-column prop="question" label="问题">
            <template slot-scope="scope">
                            <p>{{scope.row.question}}</p>
        </template>
        </el-table-column>
            <el-table-column prop="answer" label="回答">
            <template slot-scope="scope">
                            <p>{{scope.row.answer}}</p>
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
                            title : '',
                        proinfo_mediagossiprecordList:[],
            },

        }
        },
        computed: {},
        watch: {},
        created() {

        },
        mounted() {},
        methods: {
                    getproinfo_mediagossiprecordSummaries(param) {
                        const summaryField = ["answer","question"];
                        const { columns, data } = param;
                        const sums = [];
                        columns.forEach((column, index) => {
                            if (index === 0) {
                                sums[index] = '合计';
                                return;
                            }
                            if (!summaryField.includes(column.property)) {
                                sums[index] = '';
                                return;
                            }
                            const values = data.map(item => Number(item[column.property]));
                            if (!values.every(value => isNaN(value))) {
                                sums[index] = values.reduce((prev, curr) => {
                                    const value = Number(curr);
                                    if (!isNaN(value)) {
                                        return prev + curr;
                                    } else {
                                        return prev;
                                    }
                                }, 0);
                            } else {
                                sums[index] = '';
                            }
                        });
                        return sums;
                    },
            dataInfo(dataAll){
                let _dataAll =dataAll
                for(let i=0;i<_dataAll.proinfo_mediagossiprecordList.length;i++){
                    var _list = _dataAll.proinfo_mediagossiprecordList[i];
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
                            url: '/api/example/ProInfo_MediaGossipType/detail/'+this.dataForm.id,
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
