<template>
	<div>
		<el-row :gutter="15">
		<el-form ref="elForm" :model="dataForm" :rules="dataRule" size="small" label-width="100px" label-position="right"  :disabled="setting.readonly" >
		<template v-if="!loading && formOperates">
			<el-col :span="24"    v-if="judgeShow('userid')" >
				<el-form-item  label="调班人员"  
 prop="userid" >
					<user-select  :disabled="judgeWrite('userid')"  v-model="dataForm.userid"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('transfershiftid')" >
				<el-form-item  label="被调班人"  
 prop="transfershiftid" >
					<user-select  :disabled="judgeWrite('transfershiftid')"  v-model="dataForm.transfershiftid"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('year')" >
				<el-form-item  label="年份"  
 prop="year" >
					<el-date-picker  :disabled="judgeWrite('year')"  v-model="dataForm.year"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="year"  format="yyyy"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preshiftworktime')" >
				<el-form-item  label="调班前上班时间"  
 prop="preshiftworktime" >
					<el-date-picker  :disabled="judgeWrite('preshiftworktime')"  v-model="dataForm.preshiftworktime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="date"  format="yyyy-MM-dd"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('aftershiftworktime')" >
				<el-form-item  label="调班后上班时间"  
 prop="aftershiftworktime" >
					<el-date-picker  :disabled="judgeWrite('aftershiftworktime')"  v-model="dataForm.aftershiftworktime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' type="date"  format="yyyy-MM-dd"  value-format="timestamp" >

                </el-date-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('changeshiftreason')" >
				<el-form-item  label="调班事由"  
 prop="changeshiftreason" >
					<el-input  :disabled="judgeWrite('changeshiftreason')"  v-model="dataForm.changeshiftreason"
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >

                </el-input>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('profileid')" >
				<el-form-item  label="相关附件"  
 prop="profileid" >
					<HONGAN4D-UploadFz  :disabled="judgeWrite('profileid')"  v-model="dataForm.profileid"
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >

                </HONGAN4D-UploadFz>
                </el-form-item>
            </el-col>

			</template>
		</el-form>
		</el-row>
		<UserBox v-if="userBoxVisible" ref="userBox" @submit="submit" />
	</div>
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
				setting:{},
				eventType: '',
				userBoxVisible:false,
				dataForm: {
					id:'',
					flowId: '',
					status: 1,
					freeapproveruserid: '',
									userid : '',
									transfershiftid : '',
									year : '',
									preshiftworktime : '',
									aftershiftworktime : '',
									changeshiftreason : '',
									profileid : [],
            },
			tableRequiredData: {},
				dataRule:
            {
            },

			}
		},
		computed: {
			formOperates() {
				return this.setting.formOperates
			}
		},
        watch: {},
		created() {
        },
		mounted() {},
		methods: {
			judgeShow(id) {
				if (!this.setting.formOperates || !this.setting.formOperates.length) return true
				let arr = this.setting.formOperates.filter(o => o.id === id) || []
				if (!arr.length) return true
				let item = arr[0]
				return item.read
			},
			judgeWrite(id) {
				if (!this.setting.formOperates || !this.setting.formOperates.length) return false
				let arr = this.setting.formOperates.filter(o => o.id === id) || []
				if (!arr.length) return true
				let item = arr[0]
				return !item.write
			},
                goBack() {
                    this.$emit('refresh')
                },
            init(data) {
                this.dataForm.id = data.id || "";
				this.setting = data;
                this.visible = true;
				this.updateDataRule()
                this.$nextTick(() => {
                    this.$refs['elForm'].resetFields();
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/ProInfo_ChangeShift/'+this.dataForm.id,
                            method: 'get'
                        }).then(res => {
                            this.dataInfo(res.data)
                            this.loading = false
                        })
                    }
					this.$emit('setPageLoad')
                })
				this.$store.commit('generator/UPDATE_RELATION_DATA', {})
            },
			updateDataRule() {
				let newRules = {}
				for (let i = 0; i < this.setting.formOperates.length; i++) {
					const item = this.setting.formOperates[i]
					if (!item.id.includes('-')) {
						const newRulesItem = {
							required: item.required,
							message: item.name + '不能为空',
							trigger: item.trigger || 'blur'
						}
						if (!this.dataRule.hasOwnProperty(item.id)) {
							if (item.required) this.$set(newRules, item.id, [newRulesItem])
						} else {
							let withoutRequiredItem = true
							for (let i = 0; i < this.dataRule[item.id].length; i++) {
								if (this.dataRule[item.id][i].hasOwnProperty('required')) {
									this.dataRule[item.id][i].required = item.required
									withoutRequiredItem = false
								}
							}
							if (withoutRequiredItem && item.required) this.dataRule[item.id].push(newRulesItem)
						}
					} else {
						let key = item.id.split('-')[0]
						let newId = item.id.split('-')[1]
						let newItem = {
							...item,
							id: newId
						}
						if (!this.tableRequiredData.hasOwnProperty(key)) {
							this.$set(this.tableRequiredData, key, [newItem])
						} else {
							this.tableRequiredData[key].push(newItem)
						}
					}
				}
				this.dataRule = { ...this.dataRule, ...newRules }
			},
			exist() {
				let isOk = true
				for (let key in this.tableRequiredData) {
					if (this.dataForm[key] && Array.isArray(this.dataForm[key])) {
						for (let i = 0; i < this.dataForm[key].length; i++) {
							let item = this.dataForm[key][i]
							inner: for (let id in item) {
								let arr = this.tableRequiredData[key].filter(o => o.id === id) || []
								if (!arr.length) continue inner
								if (arr[0].required) {
									let msg = `${arr[0].name}不能为空`
									let boo = true
									if (arr[0].dataType === 'array') {
										boo = !this.com.hongan4d.isEmptyArray(item[id])
									} else {
										boo = !this.com.hongan4d.isEmpty(item[id])
									}
									if (!boo) {
										this.$message({
											message: msg,
											type: 'error',
											duration: 1000
										})
										isOk = false
										break
									}
								}
							}
						}
					}
				}
				return isOk
			},
			judgeRequired(id) {
				if (!this.formOperates || !this.formOperates.length) return false
				let arr = this.formOperates.filter(o => o.id === id) || []
				if (!arr.length) return false
				let item = arr[0]
				return item.required
			},
            // 表单提交
            dataFormSubmit(eventType) {
                this.$refs['elForm'].validate((valid) => {
					if (valid) {
						if (this.exist && !this.exist()) return
						if (eventType === 'audit' || eventType === 'reject') {
							this.$emit('eventReceiver', this.dataForm, eventType)
							return
						}
						this.dataForm.status = eventType === 'submit' ? 0 : 1
						this.dataForm.flowId=this.setting.flowId
						this.eventType = eventType
						if (this.eventType === 'submit') {
							this.$confirm('您确定要提交当前流程吗, 是否继续?', '提示', {
								type: 'warning'
							}).then(() => {
								this.request()
							}).catch(() => { });
						} else {
							this.request()
						}
					}
                })
            },
            request() {
                var _data =this.dataList()
                if (!this.dataForm.id) {
                    request({
                        url: '/api/example/ProInfo_ChangeShift',
                        method: 'post',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
								this.$emit('close', true)
                            }
                        })
                    })
                }else{
                    request({
                        url: '/api/example/ProInfo_ChangeShift/'+this.dataForm.id,
                        method: 'PUT',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
								this.$emit('close', true)
                            }
                        })
                    })
                }
            },
            dataList(){
                var _data = JSON.parse(JSON.stringify(this.dataForm));
                        _data.profileid = JSON.stringify(_data.profileid)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                        _dataAll.profileid = JSON.parse( _dataAll.profileid)
                this.dataForm = _dataAll
            },
        },
    }

</script>
