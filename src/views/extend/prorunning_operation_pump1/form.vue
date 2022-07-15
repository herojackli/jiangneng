<template>
	<div>
		<el-row :gutter="15">
		<el-form ref="elForm" :model="dataForm" :rules="dataRule" size="small" label-width="200px" label-position="left"  :disabled="setting.readonly" >
		<template v-if="!loading && formOperates">
			<el-col :span="24">
			<el-tabs  v-model="activelgpkea"  tab-position="top" class="mb-20">

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
				<el-form-item  label="指令内容"  
 prop="operationinstructioncontent" >
					<el-input  :disabled="judgeWrite('operationinstructioncontent')"  v-model="dataForm.operationinstructioncontent"
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >

                </el-input>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('projectmanagementprincipalid')" >
				<el-form-item  label="工程管理负责人"  
 prop="projectmanagementprincipalid" >
					<user-select  :disabled="judgeWrite('projectmanagementprincipalid')"  v-model="dataForm.projectmanagementprincipalid"
 placeholder="请选择"  clearable >

                </user-select>
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
				<el-form-item  label="第一步是否完成"  
 prop="isendO" >
					<el-radio-group  :disabled="judgeWrite('isendO')"  v-model="dataForm.isendO"
 size="small" >
                            <el-radio v-for="(item, index) in isendOOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('opentime')" >
				<el-form-item  label="通知开机时间"  
 prop="opentime" >
					<el-time-picker  :disabled="judgeWrite('opentime')"  v-model="dataForm.opentime"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('q')" >
				<el-form-item  label="流量"  
 prop="q" >
					<el-input-number  :disabled="judgeWrite('q')"  v-model="dataForm.q"
 placeholder="数字文本"  :step="1"  :precision="2"  controls-position='right' >

                </el-input-number>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationmode')" >
				<el-form-item  label="运行方式"  
 prop="operationmode" >
					<el-radio-group  :disabled="judgeWrite('operationmode')"  v-model="dataForm.operationmode"
 size="mini" >
                            <el-radio v-for="(item, index) in operationmodeOptions" :key="index" :label="item.id" :disabled="item.disabled" border >
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
                            <el-option v-for="(item, index) in operationteamidOptions" :key="index" :label="item.teamName" :value="item.Id" :disabled="item.disabled" ></el-option>

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
				<el-form-item  label="第二步是否完成"  
 prop="isendS" >
					<el-radio-group  :disabled="judgeWrite('isendS')"  v-model="dataForm.isendS"
 size="small" >
                            <el-radio v-for="(item, index) in isendSOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('observeridPump')" >
				<el-form-item  label="观察员（泵站运行）"  
 prop="observeridPump" >
					<user-select  :disabled="judgeWrite('observeridPump')"  v-model="dataForm.observeridPump"
 placeholder="请选择"  clearable >

                </user-select>
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

			<el-col :span="24"    v-if="judgeShow('observeridGate')" >
				<el-form-item  label="观察员（闸门运行）"  
 prop="observeridGate" >
					<user-select  :disabled="judgeWrite('observeridGate')"  v-model="dataForm.observeridGate"
 placeholder="请选择"  clearable >

                </user-select>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('isendT')" >
				<el-form-item  label="第三步是否完成"  
 prop="isendT" >
					<el-radio-group  :disabled="judgeWrite('isendT')"  v-model="dataForm.isendT"
 size="small" >
                            <el-radio v-for="(item, index) in isendTOptions" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
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

			</el-tab-pane >

			<el-tab-pane  label="开机操作票">

			<el-col :span="24">
			<el-collapse :accordion="false" v-model="activeviigns" class="mb-20">

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
				<el-form-item  label="开机前供电系统检查情况"  
 prop="preoperationcheck3" >
					<el-switch  :disabled="judgeWrite('preoperationcheck3')"  v-model="dataForm.preoperationcheck3"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck4')" >
				<el-form-item  label="电动机检查（定、转子绝缘）情况"  
 prop="preoperationcheck4" >
					<el-switch  :disabled="judgeWrite('preoperationcheck4')"  v-model="dataForm.preoperationcheck4"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck5')" >
				<el-form-item  label="确定水泵检查情况 "  
 prop="preoperationcheck5" >
					<el-switch  :disabled="judgeWrite('preoperationcheck5')"  v-model="dataForm.preoperationcheck5"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck6')" >
				<el-form-item  label="确定技术供水系统检查情况"  
 prop="preoperationcheck6" >
					<el-switch  :disabled="judgeWrite('preoperationcheck6')"  v-model="dataForm.preoperationcheck6"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck7')" >
				<el-form-item  label="确定闸门行程检查情况 "  
 prop="preoperationcheck7" >
					<el-switch  :disabled="judgeWrite('preoperationcheck7')"  v-model="dataForm.preoperationcheck7"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck8')" >
				<el-form-item  label="确定启闭设备检查情况（启闭机、电气设备）"  
 prop="preoperationcheck8" >
					<el-switch  :disabled="judgeWrite('preoperationcheck8')"  v-model="dataForm.preoperationcheck8"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('preoperationcheck9')" >
				<el-form-item  label="确认清污机检查情况"  
 prop="preoperationcheck9" >
					<el-switch  :disabled="judgeWrite('preoperationcheck9')"  v-model="dataForm.preoperationcheck9"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="开机预警" name="2">

			<el-col :span="24"    v-if="judgeShow('startupwarn1')" >
				<el-form-item  label="第一次预警时间"  
 prop="startupwarn1" >
					<el-time-picker  :disabled="judgeWrite('startupwarn1')"  v-model="dataForm.startupwarn1"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('startupwarn2')" >
				<el-form-item  label="第二次预警时间"  
 prop="startupwarn2" >
					<el-time-picker  :disabled="judgeWrite('startupwarn2')"  v-model="dataForm.startupwarn2"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('startupwarn3')" >
				<el-form-item  label="第三次预警时间"  
 prop="startupwarn3" >
					<el-time-picker  :disabled="judgeWrite('startupwarn3')"  v-model="dataForm.startupwarn3"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('startupwarn4')" >
				<el-form-item  label="电子显示屏"  
 prop="startupwarn4" >
					<el-switch  :disabled="judgeWrite('startupwarn4')"  v-model="dataForm.startupwarn4"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="操作步骤" name="F7flL21">

			<el-col :span="24"    v-if="judgeShow('operationstep1')" >
				<el-form-item  label="接受开机指令时间"  
 prop="operationstep1" >
					<el-time-picker  :disabled="judgeWrite('operationstep1')"  v-model="dataForm.operationstep1"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep2')" >
				<el-form-item  label="35KV倒闸操作完成时间"  
 prop="operationstep2" >
					<el-time-picker  :disabled="judgeWrite('operationstep2')"  v-model="dataForm.operationstep2"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep3')" >
				<el-form-item  label="开启技术供水泵时间"  
 prop="operationstep3" >
					<el-time-picker  :disabled="judgeWrite('operationstep3')"  v-model="dataForm.operationstep3"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep4')" >
				<el-form-item  label="控制方式"  
 prop="operationstep4" >
					<el-radio-group  :disabled="judgeWrite('operationstep4')"  v-model="dataForm.operationstep4"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep4Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep5')" >
				<el-form-item  label="机组LCU屏电源投入时间 "  
 prop="operationstep5" >
					<el-time-picker  :disabled="judgeWrite('operationstep5')"  v-model="dataForm.operationstep5"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep6')" >
				<el-form-item  label="控制方式切换"  
 prop="operationstep6" >
					<el-radio-group  :disabled="judgeWrite('operationstep6')"  v-model="dataForm.operationstep6"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep6Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep7')" >
				<el-form-item  label="合闸控制箱电源时间"  
 prop="operationstep7" >
					<el-time-picker  :disabled="judgeWrite('operationstep7')"  v-model="dataForm.operationstep7"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep8')" >
				<el-form-item  label="闸门控制方式"  
 prop="operationstep8" >
					<el-radio-group  :disabled="judgeWrite('operationstep8')"  v-model="dataForm.operationstep8"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep8Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep9')" >
				<el-form-item  label="清污机运行方式"  
 prop="operationstep9" >
					<el-radio-group  :disabled="judgeWrite('operationstep9')"  v-model="dataForm.operationstep9"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep9Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep10')" >
				<el-form-item  label="励磁柜电源已投入时间"  
 prop="operationstep10" >
					<el-time-picker  :disabled="judgeWrite('operationstep10')"  v-model="dataForm.operationstep10"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep11')" >
				<el-form-item  label="手动投励磁试验时间"  
 prop="operationstep11" >
					<el-time-picker  :disabled="judgeWrite('operationstep11')"  v-model="dataForm.operationstep11"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep12')" >
				<el-form-item  label="控制方式"  
 prop="operationstep12" >
					<el-radio-group  :disabled="judgeWrite('operationstep12')"  v-model="dataForm.operationstep12"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep12Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep13')" >
				<el-form-item  label="电动机开关小车至工作位置时间"  
 prop="operationstep13" >
					<el-time-picker  :disabled="judgeWrite('operationstep13')"  v-model="dataForm.operationstep13"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep14')" >
				<el-form-item  label="上位机运行控制模式"  
 prop="operationstep14" >
					<el-radio-group  :disabled="judgeWrite('operationstep14')"  v-model="dataForm.operationstep14"
 size="small" >
                            <el-radio v-for="(item, index) in operationstep14Options" :key="index" :label="item.id" :disabled="item.disabled" >
                                {{item.fullName}}
                            </el-radio>

                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('operationstep15')" >
				<el-form-item  label="开机操作时间"  
 prop="operationstep15" >
					<el-time-picker  :disabled="judgeWrite('operationstep15')"  v-model="dataForm.operationstep15"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="操作反馈" name="vXhlL21">

			<el-col :span="24"    v-if="judgeShow('operationfeedback')" >
				<el-form-item  label="向管理处值班人员报告操作情况时间"  
 prop="operationfeedback" >
					<el-time-picker  :disabled="judgeWrite('operationfeedback')"  v-model="dataForm.operationfeedback"
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>

                </el-time-picker>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="开机后检查" name="ePglL21">

			<el-col :span="24"    v-if="judgeShow('checkafterstartup1')" >
				<el-form-item  label="泵组运行情况（振动、异响、异味）"  
 prop="checkafterstartup1" >
					<el-switch  :disabled="judgeWrite('checkafterstartup1')"  v-model="dataForm.checkafterstartup1"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkafterstartup2')" >
				<el-form-item  label="电动机油冷却器；水量8.3m3/h,水压0.12~0.15MPa"  
 prop="checkafterstartup2" >
					<el-switch  :disabled="judgeWrite('checkafterstartup2')"  v-model="dataForm.checkafterstartup2"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkafterstartup3')" >
				<el-form-item  label="水泵填料密封润滑；水量。144m3/h,水压0.12~0.15MPa"  
 prop="checkafterstartup3" >
					<el-switch  :disabled="judgeWrite('checkafterstartup3')"  v-model="dataForm.checkafterstartup3"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('checkafterstartup4')" >
				<el-form-item  label="水泵水导轴承润滑；水量5.76m3/h,水压0.12~0.15MPa "  
 prop="checkafterstartup4" >
					<el-switch  :disabled="judgeWrite('checkafterstartup4')"  v-model="dataForm.checkafterstartup4"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="异常情况" name="RvklL21">

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
				<el-form-item  label="报告方式"  
 prop="abnormalcondition4" >
					<el-input  :disabled="judgeWrite('abnormalcondition4')"  v-model="dataForm.abnormalcondition4"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			</el-collapse>
			</el-col>

			<el-col :span="24"    v-if="judgeShow('isclose')" >
				<el-form-item  label="是否开启关机操作"  
 prop="isclose" >
					<el-switch  :disabled="judgeWrite('isclose')"  v-model="dataForm.isclose"
 :active-value="1"  :inactive-value="0" >

                </el-switch>
                </el-form-item>
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
									projectmanagementprincipalid : '',
									schedueid : "",
									isendO : "0",
									opentime : '',
									q : 0,
									operationmode : "排涝",
									operationteamid : "",
									guardianid : '',
									isendS : "0",
									observeridPump : '',
									operatorid : '',
									observeridGate : '',
									isendT : "0",
									guardianprofileid : [],
									preoperationcheck1 : 0,
									preoperationcheck2 : 0,
									preoperationcheck3 : 0,
									preoperationcheck4 : 0,
									preoperationcheck5 : 0,
									preoperationcheck6 : 0,
									preoperationcheck7 : 0,
									preoperationcheck8 : 0,
									preoperationcheck9 : 0,
									startupwarn1 : '',
									startupwarn2 : '',
									startupwarn3 : '',
									startupwarn4 : 0,
									operationstep1 : '',
									operationstep2 : '',
									operationstep3 : '',
									operationstep4 : '',
									operationstep5 : '',
									operationstep6 : '',
									operationstep7 : '',
									operationstep8 : '',
									operationstep9 : '',
									operationstep10 : '',
									operationstep11 : '',
									operationstep12 : '',
									operationstep13 : '',
									operationstep14 : '',
									operationstep15 : '',
									operationfeedback : '',
									checkafterstartup1 : 0,
									checkafterstartup2 : 0,
									checkafterstartup3 : 0,
									checkafterstartup4 : 0,
									abnormalcondition1 : '',
									abnormalcondition2 : '',
									abnormalcondition3 : '',
									abnormalcondition4 : '',
									isclose : 0,
            },
			tableRequiredData: {},
                            activelgpkea:'0',
                            activeviigns:["ePglL21","1","2","F7flL21","vXhlL21","RvklL21"],
				dataRule:
            {
                            operationmode: [
                                {
                                    required: true,
                                    message: '请至少选择一个',
                                    trigger: 'change'
                                },
                        ],
                            isclose: [
                                {
                                    required: true,
                                    message: '不能为空',
                                    trigger: 'change'
                                },
                        ],
            },
                        projectguidOptions:[],
                        pumpidsOptions:[],
                        schedueidOptions:[],
                        isendOOptions:[{"fullName":"是","id":"1"},{"fullName":"否","id":"0"}],
                        operationmodeOptions:[{"fullName":"引水","id":"引水"},{"fullName":"排涝","id":"排涝"}],
                        operationteamidOptions:[],
                        isendSOptions:[{"fullName":"是","id":"1"},{"fullName":"否","id":"0"}],
                        isendTOptions:[{"fullName":"是","id":"1"},{"fullName":"否","id":"0"}],
                        operationstep4Options:[{"fullName":"远控","id":"远控"},{"fullName":"现地","id":"现地"}],
                        operationstep6Options:[{"fullName":"远控","id":"远控"},{"fullName":"现地","id":"现地"}],
                        operationstep8Options:[{"fullName":"远控","id":"远控"},{"fullName":"现地","id":"现地"}],
                        operationstep9Options:[{"fullName":"远控","id":"远控"},{"fullName":"关闭","id":"关闭"}],
                        operationstep12Options:[{"fullName":"远控","id":"远控"},{"fullName":"现地","id":"现地"}],
                        operationstep14Options:[{"fullName":"远控","id":"远控"},{"fullName":"关闭","id":"关闭"}],

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
                            url: '/api/example/ProRunning_Operation_Pump1/'+this.dataForm.id,
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
                        url: '/api/example/ProRunning_Operation_Pump1',
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
                        url: '/api/example/ProRunning_Operation_Pump1/'+this.dataForm.id,
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
                        _data.preoperationcheck6 = parseInt(_data.preoperationcheck6)
                        _data.preoperationcheck7 = parseInt(_data.preoperationcheck7)
                        _data.preoperationcheck8 = parseInt(_data.preoperationcheck8)
                        _data.preoperationcheck9 = parseInt(_data.preoperationcheck9)
                        _data.startupwarn4 = parseInt(_data.startupwarn4)
                        _data.checkafterstartup1 = parseInt(_data.checkafterstartup1)
                        _data.checkafterstartup2 = parseInt(_data.checkafterstartup2)
                        _data.checkafterstartup3 = parseInt(_data.checkafterstartup3)
                        _data.checkafterstartup4 = parseInt(_data.checkafterstartup4)
                        _data.isclose = parseInt(_data.isclose)
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
                        _dataAll.preoperationcheck6 = parseInt( _dataAll.preoperationcheck6)
                        _dataAll.preoperationcheck7 = parseInt( _dataAll.preoperationcheck7)
                        _dataAll.preoperationcheck8 = parseInt( _dataAll.preoperationcheck8)
                        _dataAll.preoperationcheck9 = parseInt( _dataAll.preoperationcheck9)
                        _dataAll.startupwarn4 = parseInt( _dataAll.startupwarn4)
                        _dataAll.checkafterstartup1 = parseInt( _dataAll.checkafterstartup1)
                        _dataAll.checkafterstartup2 = parseInt( _dataAll.checkafterstartup2)
                        _dataAll.checkafterstartup3 = parseInt( _dataAll.checkafterstartup3)
                        _dataAll.checkafterstartup4 = parseInt( _dataAll.checkafterstartup4)
                        _dataAll.isclose = parseInt( _dataAll.isclose)
                this.dataForm = _dataAll
            },
        },
    }

</script>
