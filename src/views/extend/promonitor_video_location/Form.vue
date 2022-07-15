<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="HONGAN4D-dialog HONGAN4D-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="下拉选择"  
 prop="supplementguid" >
                    <el-select    v-model="dataForm.supplementguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in supplementguidOptions" :key="index" :label="item.ManageUnitName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="位置名称"  
 prop="localename" >
                    <el-input    v-model="dataForm.localename"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="排序"  
 prop="orderindex" >
                    <el-input-number    v-model="dataForm.orderindex"
 placeholder="数字文本"  :step="1" >

                </el-input-number>
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
                    <el-select   v-model="scope.row.videoinfoguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in videoinfoguidOptions" :key="index" :label="item.videoname" :value="item.id" :disabled="item.disabled" ></el-option>
                </el-select>
            </template>
        </el-table-column>
    <el-table-column label="操作" width="50" >
        <template slot-scope="scope">
            <el-button size="mini" type="text" class="HONGAN4D-table-delBtn" @click="delpromonitor_video_location_infoList(scope.$index)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <div class="table-actions" @click="addpromonitor_video_location_infoList()">
        <el-button type="text" icon="el-icon-plus">添加</el-button>
    </div>
    </el-form-item>
    </el-col>
    </template>
</el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false"> 取 消</el-button>
        <el-button type="primary" @click="dataFormSubmit()" v-if="!isDetail"> 确 定</el-button>
    </span>
    </el-dialog>
</template>
<script>
    import request from '@/utils/request'
    import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
    import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false,
                loading: false,
                isDetail: false,
            dataForm: {
                            supplementguid : "",
                            localename : '',
                            orderindex : '',
                        promonitor_video_location_infoList:[],
            },
            rules:
            {
            },
                        supplementguidOptions:[],

                        videoinfoguidOptions:[],
        }
        },
        computed: {},
        watch: {},
        created() {
                    this.getsupplementguidOptions();
                        this.getvideoinfoguidOptions();
        },
        mounted() {},
        methods: {
				promonitor_video_location_infoExist() {
				let isOk = true;
					for(let i=0;i<this.dataForm.promonitor_video_location_infoList.length;i++){
						const e = this.dataForm.promonitor_video_location_infoList[i];
					}
				return isOk;
			},
                    getsupplementguidOptions() {
                        getDataInterfaceRes('306353102468939909').then(res => {
                            let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.supplementguidOptions = data
                        })
                    },
                        getvideoinfoguidOptions() {
                            getDataInterfaceRes('306476615787872389').then(res => {
                                let data = this.com.hongan4d.interfaceDataHandler(res.data)
                                this.videoinfoguidOptions = data
                            })
                        },
            clearData(data){
                for (let key in data) {
                    if (data[key] instanceof Array) {
                        data[key] = [];
                    } else if (data[key] instanceof Object) {
                        this.clearData(data[key]);
                    } else {
                        data[key] = "";
                    }
                }
            },
            init(id, isDetail) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.isDetail = isDetail || false;
                this.$nextTick(() => {
                    this.$refs['elForm'].resetFields();
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProMonitor_Video_Location/'+this.dataForm.id,
                            method: 'get'
                        }).then(res => {
                            this.dataInfo(res.data)
                            this.loading = false
                        });
                    }else{
                       this.clearData(this.dataForm)
                    }
                });
                this.$store.commit('generator/UPDATE_RELATION_DATA', {})
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['elForm'].validate((valid) => {
                    if (valid) {
                            if (!this.promonitor_video_location_infoExist()) return
                            this.request()
                    }
                })
            },
            request() {
                var _data =this.dataList()
                if (!this.dataForm.id) {
                    request({
                        url: '/api/example/ProMonitor_Video_Location',
                        method: 'post',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refresh', true)
                            }
                        })
                    })
                }else{
                    request({
                        url: '/api/example/ProMonitor_Video_Location/'+this.dataForm.id,
                        method: 'PUT',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refresh', true)
                            }
                        })
                    })
                }
            },
                addpromonitor_video_location_infoList(){
                    let item = {
                            videoinfoguid:undefined,
                }
                    this.dataForm.promonitor_video_location_infoList.push(item)
                },
                delpromonitor_video_location_infoList(index) {
                    this.dataForm.promonitor_video_location_infoList.splice(index, 1);
                },
            dataList(){
                var _data = JSON.parse(JSON.stringify(this.dataForm));
                    for(let i=0;i<_data.promonitor_video_location_infoList.length;i++){
                        var _list = _data.promonitor_video_location_infoList[i];
                    }
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                    for(let i=0;i<_dataAll.promonitor_video_location_infoList.length;i++){
                        var _list = _dataAll.promonitor_video_location_infoList[i];
                    }
                this.dataForm = _dataAll
            },
        },
    }

</script>
