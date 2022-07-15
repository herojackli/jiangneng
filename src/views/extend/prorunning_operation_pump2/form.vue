<template>
	<div>
		<el-row :gutter="15">
		<el-form ref="elForm" :model="dataForm" :rules="dataRule" size="small" label-width="250px" label-position="left"  :disabled="setting.readonly" >
		<template v-if="!loading && formOperates">
			<el-col :span="24">
			<el-tabs  v-model="activettipvo"  tab-position="top" class="mb-20">

			<el-tab-pane  label="运行指令">

			<el-col :span="24"    v-if="judgeShow('operationno')" >
				<el-form-item  label="操作票编号"  
 prop="operationno" >
					<el-input  :disabled="judgeWrite('operationno')"  v-model="dataForm.operationno"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('projectguid')" >
				<el-form-item  label="工程名称"  
 prop="projectguid" >
					<el-select  :disabled="judgeWrite('projectguid')"  v-model="dataForm.projectguid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in projectguidOptions" :key="index" :label="item.ProName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('pumpids')" >
				<el-form-item  label="操作机组"  
 prop="pumpids" >
					<el-select  :disabled="judgeWrite('pumpids')"  v-model="dataForm.pumpids"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' :multiple="true" >
                            <el-option v-for="(item, index) in pumpidsOptions" :key="index" :label="item.PumpName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationinstructioncontent')" >
				<el-form-item  label="停机运行指令内容"  
 prop="operationinstructioncontent" >
					<el-input  :disabled="judgeWrite('operationinstructioncontent')"  v-model="dataForm.operationinstructioncontent"
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >

                </el-input>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('schedueid')" >
				<el-form-item  label="调度令"  
 prop="schedueid" >
					<el-select  :disabled="judgeWrite('schedueid')"  v-model="dataForm.schedueid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in schedueidOptions" :key="index" :label="item.FileName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('isendO')" >
				<el-form-item  label="是否完成（针对第一步运行指令）"  
 prop="isendO" >
					<el-radio-group  :disabled="judgeWrite('isendO')"  v-model="dataForm.isendO"
 size="small" >
                            <el-radio v-for="(item, index) in isendOOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('closetime')" >
				<el-form-item  label="通知停机时间"  
 prop="closetime" >
					<el-time-picker  :disabled="judgeWrite('closetime')"  v-model="dataForm.closetime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationmodeenumid')" >
				<el-form-item  label="运行方式"  
 prop="operationmodeenumid" >
					<el-radio-group  :disabled="judgeWrite('operationmodeenumid')"  v-model="dataForm.operationmodeenumid"
 size="small" >
                            <el-radio v-for="(item, index) in operationmodeenumidOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationteamid')" >
				<el-form-item  label="运行班组"  
 prop="operationteamid" >
					<el-select  :disabled="judgeWrite('operationteamid')"  v-model="dataForm.operationteamid"
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in operationteamidOptions" :key="index" :label="item.TeamName" :value="item.Id" :disabled="item.disabled" ></el-option>

                </el-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('guardianid')" >
				<el-form-item  label="监护员（高配）"  
 prop="guardianid" >
					<user-select  :disabled="judgeWrite('guardianid')"  v-model="dataForm.guardianid"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('isendS')" >
				<el-form-item  label="是否完成（针对第二步运行通知）"  
 prop="isendS" >
					<el-radio-group  :disabled="judgeWrite('isendS')"  v-model="dataForm.isendS"
 size="small" >
                            <el-radio v-for="(item, index) in isendSOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operatorid')" >
				<el-form-item  label="操作员（高配）"  
 prop="operatorid" >
					<user-select  :disabled="judgeWrite('operatorid')"  v-model="dataForm.operatorid"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('guardianprofileid')" >
				<el-form-item  label="监护员签名附件"  
 prop="guardianprofileid" >
					<HONGAN4D-UploadImg  :disabled="judgeWrite('guardianprofileid')"  v-model="dataForm.guardianprofileid"
 :fileSize="5"    sizeUnit="MB"  :limit="1" >

                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('isendT')" >
				<el-form-item  label="是否完成（针对第三步开机指令）"  
 prop="isendT" >
					<el-radio-group  :disabled="judgeWrite('isendT')"  v-model="dataForm.isendT"
 size="small" >
                            <el-radio v-for="(item, index) in isendTOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			</el-tab-pane >

			<el-tab-pane  label="关机操作票">

			<el-col :span="24">
			<el-collapse :accordion="false" v-model="activebescea" class="mb-20">

			<el-collapse-item title="操作前检查" name="1">

			<el-col :span="24"    v-if="judgeShow('preoperationcheck1')" >
				<el-form-item  label="引水闸关闭检查情况"  
 prop="preoperationcheck1" >
					<el-switch  :disabled="judgeWrite('preoperationcheck1')"  v-model="dataForm.preoperationcheck1"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck2')" >
				<el-form-item  label="上、下游水面检查工作完成确认"  
 prop="preoperationcheck2" >
					<el-switch  :disabled="judgeWrite('preoperationcheck2')"  v-model="dataForm.preoperationcheck2"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck3')" >
				<el-form-item  label="确定水泵检查情况 "  
 prop="preoperationcheck3" >
					<el-switch  :disabled="judgeWrite('preoperationcheck3')"  v-model="dataForm.preoperationcheck3"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck4')" >
				<el-form-item  label="确定技术供水系统检查情况 "  
 prop="preoperationcheck4" >
					<el-switch  :disabled="judgeWrite('preoperationcheck4')"  v-model="dataForm.preoperationcheck4"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck5')" >
				<el-form-item  label="确认清污机检查情况"  
 prop="preoperationcheck5" >
					<el-switch  :disabled="judgeWrite('preoperationcheck5')"  v-model="dataForm.preoperationcheck5"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="操作步骤" name="2">

			<el-col :span="24"    v-if="judgeShow('operationstep1')" >
				<el-form-item  label="1 接受停机指令时间"  
 prop="operationstep1" >
					<el-time-picker  :disabled="judgeWrite('operationstep1')"  v-model="dataForm.operationstep1"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep2')" >
				<el-form-item  label="2. 停机操作时间 "  
 prop="operationstep2" >
					<el-time-picker  :disabled="judgeWrite('operationstep2')"  v-model="dataForm.operationstep2"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep3')" >
				<el-form-item  label="3. 停机操作完毕时间"  
 prop="operationstep3" >
					<el-time-picker  :disabled="judgeWrite('operationstep3')"  v-model="dataForm.operationstep3"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep4')" >
				<el-form-item  label="4. 电动机开关小车摇至试验位置时间"  
 prop="operationstep4" >
					<el-time-picker  :disabled="judgeWrite('operationstep4')"  v-model="dataForm.operationstep4"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep5')" >
				<el-form-item  label="5. 确认励磁系统退出"  
 prop="operationstep5" >
					<el-radio-group  :disabled="judgeWrite('operationstep5')"  v-model="dataForm.operationstep5"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep5Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep6')" >
				<el-form-item  label="6. 倒闸操作完成时间"  
 prop="operationstep6" >
					<el-time-picker  :disabled="judgeWrite('operationstep6')"  v-model="dataForm.operationstep6"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep7')" >
				<el-form-item  label="7. 技术供水管路冲洗15分钟"  
 prop="operationstep7" >
					<el-radio-group  :disabled="judgeWrite('operationstep7')"  v-model="dataForm.operationstep7"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep7Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep8')" >
				<el-form-item  label="8. 停止清污机、关闭电源"  
 prop="operationstep8" >
					<el-radio-group  :disabled="judgeWrite('operationstep8')"  v-model="dataForm.operationstep8"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep8Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="操作反馈" name="VgIAM21">

			<el-col :span="24"    v-if="judgeShow('operationfeedback')" >
				<el-form-item  label="向管理处值班人员报告操作情况时间  "  
 prop="operationfeedback" >
					<el-time-picker  :disabled="judgeWrite('operationfeedback')"  v-model="dataForm.operationfeedback"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="关机后检查" name="LBKAM21">

			<el-col :span="24"    v-if="judgeShow('checkaftershutdown1')" >
				<el-form-item  label="检查泵组是否停止运行"  
 prop="checkaftershutdown1" >
					<el-switch  :disabled="judgeWrite('checkaftershutdown1')"  v-model="dataForm.checkaftershutdown1"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkaftershutdown2')" >
				<el-form-item  label="检查对应工作、快速闸门是否已全关 "  
 prop="checkaftershutdown2" >
					<el-switch  :disabled="judgeWrite('checkaftershutdown2')"  v-model="dataForm.checkaftershutdown2"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkaftershutdown3')" >
				<el-form-item  label="检查对饮工作、快速闸门止水情况 "  
 prop="checkaftershutdown3" >
					<el-switch  :disabled="judgeWrite('checkaftershutdown3')"  v-model="dataForm.checkaftershutdown3"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkaftershutdown4')" >
				<el-form-item  label="检查启闭设备情况（启闭机、钢丝绳）"  
 prop="checkaftershutdown4" >
					<el-switch  :disabled="judgeWrite('checkaftershutdown4')"  v-model="dataForm.checkaftershutdown4"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkaftershutdown5')" >
				<el-form-item  label="检查对应机组技术供水电磁阀是否已关闭"  
 prop="checkaftershutdown5" >
					<el-switch  :disabled="judgeWrite('checkaftershutdown5')"  v-model="dataForm.checkaftershutdown5"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkaftershutdown6')" >
				<el-form-item  label="检查对应技术供水泵是否已停止 "  
 prop="checkaftershutdown6" >
					<el-switch  :disabled="judgeWrite('checkaftershutdown6')"  v-model="dataForm.checkaftershutdown6"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="异常情况" name="5mLAM21">

			<el-col :span="24"    v-if="judgeShow('abnormalcondition1')" >
				<el-form-item  label="情况描述"  
 prop="abnormalcondition1" >
					<el-input  :disabled="judgeWrite('abnormalcondition1')"  v-model="dataForm.abnormalcondition1"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('abnormalcondition2')" >
				<el-form-item  label="情况报告对象"  
 prop="abnormalcondition2" >
					<user-select  :disabled="judgeWrite('abnormalcondition2')"  v-model="dataForm.abnormalcondition2"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('abnormalcondition3')" >
				<el-form-item  label="报告时间"  
 prop="abnormalcondition3" >
					<el-time-picker  :disabled="judgeWrite('abnormalcondition3')"  v-model="dataForm.abnormalcondition3"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('abnormalcondition4')" >
				<el-form-item  label="报告方式 "  
 prop="abnormalcondition4" >
					<el-input  :disabled="judgeWrite('abnormalcondition4')"  v-model="dataForm.abnormalcondition4"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			</el-collapse>
			</el-col>

			</el-tab-pane >

			</el-tabs>
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
									operationno : '',
									projectguid : "",
									pumpids : [],
									operationinstructioncontent : '',
									schedueid : "",
									isendO : "0",
									closetime : '',
									operationmodeenumid : '',
									operationteamid : "",
									guardianid : '',
									isendS : "0",
									operatorid : '',
									guardianprofileid : [],
									isendT : "0",
									preoperationcheck1 : 0,
									preoperationcheck2 : 0,
									preoperationcheck3 : 0,
									preoperationcheck4 : 0,
									preoperationcheck5 : 0,
									operationstep1 : '',
									operationstep2 : '',
									operationstep3 : '',
									operationstep4 : '',
									operationstep5 : '',
									operationstep6 : '',
									operationstep7 : '',
									operationstep8 : '',
									operationfeedback : '',
									checkaftershutdown1 : 0,
									checkaftershutdown2 : 0,
									checkaftershutdown3 : 0,
									checkaftershutdown4 : 0,
									checkaftershutdown5 : 0,
									checkaftershutdown6 : 0,
									abnormalcondition1 : '',
									abnormalcondition2 : '',
									abnormalcondition3 : '',
									abnormalcondition4 : '',
            },
			tableRequiredData: {},
                            activettipvo:'0',
                            activebescea:["1","2","VgIAM21","LBKAM21","5mLAM21"],
				dataRule:
            {
            },
                        projectguidOptions:[],
                        pumpidsOptions:[],
                        schedueidOptions:[],
                        isendOOptions:[{"fullName":"是","id":"1"},{"fullName":"否","id":"0"}],
                        operationmodeenumidOptions:[{"fullName":"引水","id":"引水"},{"fullName":"排涝","id":"排涝"}],
                        operationteamidOptions:[],
                        isendSOptions:[{"fullName":"是","id":"1"},{"fullName":"否","id":"0"}],
                        isendTOptions:[{"fullName":"是","id":"1"},{"fullName":"否","id":"0"}],
                        operationstep5Options:[{"fullName":"完成","id":"完成"},{"fullName":"未完成","id":"未完成"}],
                        operationstep7Options:[{"fullName":"完成","id":"完成"},{"fullName":"未完成","id":"未完成"}],
                        operationstep8Options:[{"fullName":"完成","id":"完成"},{"fullName":"未完成","id":"未完成"}],

			}
		},
		computed: {
			formOperates() {
				return this.setting.formOperates
			}
		},
        watch: {},
		created() {
			this.getprojectguidOptions();
			this.getpumpidsOptions();
			this.getschedueidOptions();
			this.getoperationteamidOptions();
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
			getprojectguidOptions() {
				getDataInterfaceRes('306039649598439557').then(res => {
					let data = this.com.hongan4d.interfaceDataHandler(res.data)
					this.projectguidOptions = data
				})
			},
			getpumpidsOptions() {
				getDataInterfaceRes('306454850680389765').then(res => {
					let data = this.com.hongan4d.interfaceDataHandler(res.data)
					this.pumpidsOptions = data
				})
			},
			getschedueidOptions() {
				getDataInterfaceRes('306703098280149189').then(res => {
					let data = this.com.hongan4d.interfaceDataHandler(res.data)
					this.schedueidOptions = data
				})
			},
			getoperationteamidOptions() {
				getDataInterfaceRes('306421273758531717').then(res => {
					let data = this.com.hongan4d.interfaceDataHandler(res.data)
					this.operationteamidOptions = data
				})
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
                            url: '/api/example/ProRunning_Operation_Pump2/'+this.dataForm.id,
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
                        url: '/api/example/ProRunning_Operation_Pump2',
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
                        url: '/api/example/ProRunning_Operation_Pump2/'+this.dataForm.id,
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
                            _data.pumpids = JSON.stringify(_data.pumpids)
                        _data.guardianprofileid = JSON.stringify(_data.guardianprofileid)
                        _data.preoperationcheck1 = parseInt(_data.preoperationcheck1)
                        _data.preoperationcheck2 = parseInt(_data.preoperationcheck2)
                        _data.preoperationcheck3 = parseInt(_data.preoperationcheck3)
                        _data.preoperationcheck4 = parseInt(_data.preoperationcheck4)
                        _data.preoperationcheck5 = parseInt(_data.preoperationcheck5)
                        _data.checkaftershutdown1 = parseInt(_data.checkaftershutdown1)
                        _data.checkaftershutdown2 = parseInt(_data.checkaftershutdown2)
                        _data.checkaftershutdown3 = parseInt(_data.checkaftershutdown3)
                        _data.checkaftershutdown4 = parseInt(_data.checkaftershutdown4)
                        _data.checkaftershutdown5 = parseInt(_data.checkaftershutdown5)
                        _data.checkaftershutdown6 = parseInt(_data.checkaftershutdown6)
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                            _dataAll.pumpids = JSON.parse( _dataAll.pumpids)
                        _dataAll.guardianprofileid = JSON.parse( _dataAll.guardianprofileid)
                        _dataAll.preoperationcheck1 = parseInt( _dataAll.preoperationcheck1)
                        _dataAll.preoperationcheck2 = parseInt( _dataAll.preoperationcheck2)
                        _dataAll.preoperationcheck3 = parseInt( _dataAll.preoperationcheck3)
                        _dataAll.preoperationcheck4 = parseInt( _dataAll.preoperationcheck4)
                        _dataAll.preoperationcheck5 = parseInt( _dataAll.preoperationcheck5)
                        _dataAll.checkaftershutdown1 = parseInt( _dataAll.checkaftershutdown1)
                        _dataAll.checkaftershutdown2 = parseInt( _dataAll.checkaftershutdown2)
                        _dataAll.checkaftershutdown3 = parseInt( _dataAll.checkaftershutdown3)
                        _dataAll.checkaftershutdown4 = parseInt( _dataAll.checkaftershutdown4)
                        _dataAll.checkaftershutdown5 = parseInt( _dataAll.checkaftershutdown5)
                        _dataAll.checkaftershutdown6 = parseInt( _dataAll.checkaftershutdown6)
                this.dataForm = _dataAll
            },
        },
    }

</script>
