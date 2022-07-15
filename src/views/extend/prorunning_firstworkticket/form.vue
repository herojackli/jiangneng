<template>
	<div>
		<el-row :gutter="15">
		<el-form ref="elForm" :model="dataForm" :rules="dataRule" size="small" label-width="100px" label-position="top"  :disabled="setting.readonly" >
		<template v-if="!loading && formOperates">
			<el-col :span="24">
			<el-tabs  v-model="activeatduse"  tab-position="top" class="mb-20">

			<el-tab-pane  label="工作票内容">


			<el-col :span="24"    v-if="judgeShow('workticketno')" >
				<el-form-item  label="工作票编号"  
 prop="workticketno" >
					<el-input  :disabled="judgeWrite('workticketno')"  v-model="dataForm.workticketno"
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguid')" >
                <el-form-item  label="工程名称"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguid" >
                    <el-select   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguid')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguidOptions" :key="index" :label="item.ProName" :value="item.Id" :disabled="item.disabled" ></el-option>
                </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipaluserid')" >
                <el-form-item  label="工作负责人（监护人）"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipaluserid" >
                    <user-select   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipaluserid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipaluserid')" 
 placeholder="请选择"  clearable >
                </user-select>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_groupteamid')" >
                <el-form-item  label="班组"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_groupteamid" >
                    <el-select   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_groupteamid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_groupteamid')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}'>
                            <el-option v-for="(item, index) in hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_groupteamidOptions" :key="index" :label="item.fullName" :value="item.id" :disabled="item.disabled" ></el-option>
                </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workteamids')" >
                <el-form-item  label="工作人员"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workteamids" >
                    <user-select   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workteamids" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workteamids')" 
 placeholder="请选择"  clearable  :multiple="true" >
                </user-select>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_scenesafeuserid')" >
                <el-form-item  label="现场安全员"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_scenesafeuserid" >
                    <user-select   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_scenesafeuserid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_scenesafeuserid')" 
 placeholder="请选择"  clearable >
                </user-select>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workcontent')" >
                <el-form-item  label="工作内容"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workcontent" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workcontent" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workcontent')" 
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workaddress')" >
                <el-form-item  label="工作地点"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workaddress" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workaddress" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workaddress')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planstarttime')" >
                <el-form-item  label="计划开始时间"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planstarttime" >
                    <el-time-picker   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planstarttime" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planstarttime')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
                </el-time-picker>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planendtime')" >
                <el-form-item  label="计划结束时间"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planendtime" >
                    <el-time-picker   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planendtime" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planendtime')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
                </el-time-picker>
                </el-form-item>
            </el-col>

			<el-col :span="24"    v-if="judgeShow('workbillsigneruserid')" >
				<el-form-item  label="工作票签发人"  
 prop="workbillsigneruserid" >
					<el-input  :disabled="judgeWrite('workbillsigneruserid')"  v-model="dataForm.workbillsigneruserid"
 placeholder="请输入"  readonly  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>

			<el-col   :span="24" >
			<el-card class="mb-20" shadow ="always">

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasureone')" >
                <el-form-item  label="1. 已拉开关和隔离闸刀：（注明编号）"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasureone" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasureone" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasureone')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasuretwo')" >
                <el-form-item  label="2. 已装接地线、应合接地刀闸：（注明装设地点、名称及编号）"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasuretwo" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasuretwo" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasuretwo')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasurethree')" >
                <el-form-item  label="3. 已设遮栏、应挂标示牌：（注明地点）"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasurethree" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasurethree" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasurethree')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

			</el-card>
        	</el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workbillsignersignatureprofileid')" >
                <el-form-item  label="工作票签发人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workbillsignersignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workbillsignersignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workbillsignersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="1" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureid')" >
                <el-form-item  label="值班负责人"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureid" >
                    <user-select   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureid')" 
 placeholder="请选择"  clearable >
                </user-select>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipalusersignatureprofileid')" >
                <el-form-item  label="工作负责人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipalusersignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipalusersignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipalusersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="1" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>


			</el-tab-pane >

			<el-tab-pane  label="工作票执行">

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_creationtime')" >
                <el-form-item  label="创建时间"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_creationtime" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_creationtime" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_creationtime')" 
 placeholder="系统自动生成"  readonly >
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusersignatureprofileid')" >
                <el-form-item  label="工作许可人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusersignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusersignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

			<el-col   :span="24" >
			<el-card class="mb-20" shadow ="always">

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasureone')" >
                <el-form-item  label="1. 已拉开关和隔离闸刀：（注明编号）"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasureone" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasureone" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasureone')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasuretwo')" >
                <el-form-item  label="2. 已装接地线、应合接地刀闸：（注明装设地点、名称及编号）"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasuretwo" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasuretwo" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasuretwo')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurethree')" >
                <el-form-item  label="3. 已设遮栏、应挂标示牌：（注明地点）"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurethree" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurethree" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurethree')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurefour')" >
                <el-form-item  label="4. 工作地点保留带电部分和补充安全措施："  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurefour" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurefour" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurefour')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

			</el-card>
        	</el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureprofileid')" >
                <el-form-item  label="值班负责人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_permissionstarttime')" >
                <el-form-item  label="许可开始工作时间"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_permissionstarttime" >
                    <el-time-picker   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_permissionstarttime" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_permissionstarttime')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="HH:mm:ss"  value-format="HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
                </el-time-picker>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusesignatureprofileid')" >
                <el-form-item  label="工作许可人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusesignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusesignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusesignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workprincipalusersignatureprofileid')" >
                <el-form-item  label="工作负责人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workprincipalusersignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workprincipalusersignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workprincipalusersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

			</el-tab-pane >

			<el-tab-pane  label="工作票变动">

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapproved')" >
                <el-form-item  label="是否进入完结"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapproved" >
                    <el-radio-group   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapproved" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapproved')" 
 size="small" >
                            <el-radio v-for="(item, index) in hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapprovedOptions" :key="index" :label="item.id" :disabled="item.disabled" border >
                                {{item.fullName}}
                            </el-radio>
                </el-radio-group>
                </el-form-item>
            </el-col>

			<el-col :span="24">
			<el-collapse :accordion="false" v-model="activepqhvqn" class="mb-20">

			<el-collapse-item title="工作负责人变动" name="1">

			<el-col :span="24"    v-if="judgeShow('workprincipaluserid')" >
				<el-form-item  label="原工作负责人"  
 prop="workprincipaluserid" >
					<el-input  :disabled="judgeWrite('workprincipaluserid')"  v-model="dataForm.workprincipaluserid"
 placeholder="请输入"  readonly  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_leavereason')" >
                <el-form-item  label="离去原因"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_leavereason" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_leavereason" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_leavereason')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_newworkprincipaluserid')" >
                <el-form-item  label="变更后工作负责人"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_newworkprincipaluserid" >
                    <user-select   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_newworkprincipaluserid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_newworkprincipaluserid')" 
 placeholder="请选择"  clearable >
                </user-select>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_changetime')" >
                <el-form-item  label="变动时间"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_changetime" >
                    <el-time-picker   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_changetime" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_changetime')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
                </el-time-picker>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_workbillsignersignatureprofileid')" >
                <el-form-item  label="工作票签发人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_workbillsignersignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_workbillsignersignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_workbillsignersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

			</el-collapse-item>

			<el-collapse-item title="工作人员变动" name="2">


			<el-col :span="24" v-if="judgeShow('prorunning_firstworkticket_change_personList') && formOperates">
				<el-form-item label-width="0">
					<div class="HONGAN4D-common-title">
						<h2>增添人员信息</h2>
					</div>
    <el-table :data="dataForm.prorunning_firstworkticket_change_personList" size='mini'   >
						<el-table-column type="index" width="50" label="序号" align="center" />
			<el-table-column prop="username" label="增添人员姓名"   v-if="judgeShow('prorunning_firstworkticket_change_personList-username')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_personList-username')">
					<span class="required-sign">*</span>增添人员姓名
				</template>
				<template slot-scope="scope">
					<el-input   v-model="scope.row.username" :disabled="judgeWrite('prorunning_firstworkticket_change_personList') || judgeWrite('prorunning_firstworkticket_change_personList-username')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
				</el-input>
		</template>
		</el-table-column>
			<el-table-column prop="tm" label="时间"   v-if="judgeShow('prorunning_firstworkticket_change_personList-tm')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_personList-tm')">
					<span class="required-sign">*</span>时间
				</template>
				<template slot-scope="scope">
					<el-time-picker   v-model="scope.row.tm" :disabled="judgeWrite('prorunning_firstworkticket_change_personList') || judgeWrite('prorunning_firstworkticket_change_personList-tm')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="HH:mm:ss"  value-format="HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
				</el-time-picker>
		</template>
		</el-table-column>
			<el-table-column prop="workprincipalusername" label="工作负责人"   v-if="judgeShow('prorunning_firstworkticket_change_personList-workprincipalusername')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_personList-workprincipalusername')">
					<span class="required-sign">*</span>工作负责人
				</template>
				<template slot-scope="scope">
					<el-input   v-model="scope.row.workprincipalusername" :disabled="judgeWrite('prorunning_firstworkticket_change_personList') || judgeWrite('prorunning_firstworkticket_change_personList-workprincipalusername')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
				</el-input>
		</template>
		</el-table-column>
						<el-table-column label="操作" width="50" v-if="!setting.readonly && !judgeWrite('prorunning_firstworkticket_change_personList')" >
							<template slot-scope="scope">
								<el-button size="mini" type="text" class="HONGAN4D-table-delBtn" @click="delprorunning_firstworkticket_change_personList(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="table-actions" @click="addprorunning_firstworkticket_change_personList()" v-if="!setting.readonly && !judgeWrite('prorunning_firstworkticket_change_personList')">
						<el-button type="text" icon="el-icon-plus">添加</el-button>
					</div>
				</el-form-item>
			</el-col>

			<el-col :span="24" v-if="judgeShow('prorunning_firstworkticket_change_person_leaveList') && formOperates">
				<el-form-item label-width="0">
					<div class="HONGAN4D-common-title">
						<h2>离去人员信息</h2>
					</div>
    <el-table :data="dataForm.prorunning_firstworkticket_change_person_leaveList" size='mini'   >
						<el-table-column type="index" width="50" label="序号" align="center" />
			<el-table-column prop="username" label="离去人员姓名"   v-if="judgeShow('prorunning_firstworkticket_change_person_leaveList-username')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_person_leaveList-username')">
					<span class="required-sign">*</span>离去人员姓名
				</template>
				<template slot-scope="scope">
					<el-input   v-model="scope.row.username" :disabled="judgeWrite('prorunning_firstworkticket_change_person_leaveList') || judgeWrite('prorunning_firstworkticket_change_person_leaveList-username')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
				</el-input>
		</template>
		</el-table-column>
			<el-table-column prop="tm" label="时间"   v-if="judgeShow('prorunning_firstworkticket_change_person_leaveList-tm')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_person_leaveList-tm')">
					<span class="required-sign">*</span>时间
				</template>
				<template slot-scope="scope">
					<el-time-picker   v-model="scope.row.tm" :disabled="judgeWrite('prorunning_firstworkticket_change_person_leaveList') || judgeWrite('prorunning_firstworkticket_change_person_leaveList-tm')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="HH:mm:ss"  value-format="HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
				</el-time-picker>
		</template>
		</el-table-column>
			<el-table-column prop="workprincipalusername" label="工作负责人"   v-if="judgeShow('prorunning_firstworkticket_change_person_leaveList-workprincipalusername')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_person_leaveList-workprincipalusername')">
					<span class="required-sign">*</span>工作负责人
				</template>
				<template slot-scope="scope">
					<el-input   v-model="scope.row.workprincipalusername" :disabled="judgeWrite('prorunning_firstworkticket_change_person_leaveList') || judgeWrite('prorunning_firstworkticket_change_person_leaveList-workprincipalusername')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
				</el-input>
		</template>
		</el-table-column>
						<el-table-column label="操作" width="50" v-if="!setting.readonly && !judgeWrite('prorunning_firstworkticket_change_person_leaveList')" >
							<template slot-scope="scope">
								<el-button size="mini" type="text" class="HONGAN4D-table-delBtn" @click="delprorunning_firstworkticket_change_person_leaveList(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="table-actions" @click="addprorunning_firstworkticket_change_person_leaveList()" v-if="!setting.readonly && !judgeWrite('prorunning_firstworkticket_change_person_leaveList')">
						<el-button type="text" icon="el-icon-plus">添加</el-button>
					</div>
				</el-form-item>
			</el-col>

			</el-collapse-item>

			<el-collapse-item title="工作票延期" name="TeO7K21">


			<el-col :span="24" v-if="judgeShow('prorunning_firstworkticket_change_delayList') && formOperates">
				<el-form-item label-width="0">
					<div class="HONGAN4D-common-title">
						<h2>工作票延期</h2>
					</div>
    <el-table :data="dataForm.prorunning_firstworkticket_change_delayList" size='mini'   >
						<el-table-column type="index" width="50" label="序号" align="center" />
			<el-table-column prop="validovertime" label="时间有效延长至"   v-if="judgeShow('prorunning_firstworkticket_change_delayList-validovertime')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_delayList-validovertime')">
					<span class="required-sign">*</span>时间有效延长至
				</template>
				<template slot-scope="scope">
					<el-time-picker   v-model="scope.row.validovertime" :disabled="judgeWrite('prorunning_firstworkticket_change_delayList') || judgeWrite('prorunning_firstworkticket_change_delayList-validovertime')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="HH:mm:ss"  value-format="HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
				</el-time-picker>
		</template>
		</el-table-column>
			<el-table-column prop="workprincipalusersignatureprofileid" label="工作负责人签名"   v-if="judgeShow('prorunning_firstworkticket_change_delayList-workprincipalusersignatureprofileid')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_delayList-workprincipalusersignatureprofileid')">
					<span class="required-sign">*</span>工作负责人签名
				</template>
				<template slot-scope="scope">
					<HONGAN4D-UploadFz   v-model="scope.row.workprincipalusersignatureprofileid" :disabled="judgeWrite('prorunning_firstworkticket_change_delayList') || judgeWrite('prorunning_firstworkticket_change_delayList-workprincipalusersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >
				</HONGAN4D-UploadFz>
		</template>
		</el-table-column>
			<el-table-column prop="workpermissionusesignatureprofileid" label="工作许可人签名"   v-if="judgeShow('prorunning_firstworkticket_change_delayList-workpermissionusesignatureprofileid')"  >
				<template slot="header" v-if="judgeRequired('prorunning_firstworkticket_change_delayList-workpermissionusesignatureprofileid')">
					<span class="required-sign">*</span>工作许可人签名
				</template>
				<template slot-scope="scope">
					<HONGAN4D-UploadFz   v-model="scope.row.workpermissionusesignatureprofileid" :disabled="judgeWrite('prorunning_firstworkticket_change_delayList') || judgeWrite('prorunning_firstworkticket_change_delayList-workpermissionusesignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >
				</HONGAN4D-UploadFz>
		</template>
		</el-table-column>
						<el-table-column label="操作" width="50" v-if="!setting.readonly && !judgeWrite('prorunning_firstworkticket_change_delayList')" >
							<template slot-scope="scope">
								<el-button size="mini" type="text" class="HONGAN4D-table-delBtn" @click="delprorunning_firstworkticket_change_delayList(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="table-actions" @click="addprorunning_firstworkticket_change_delayList()" v-if="!setting.readonly && !judgeWrite('prorunning_firstworkticket_change_delayList')">
						<el-button type="text" icon="el-icon-plus">添加</el-button>
					</div>
				</el-form-item>
			</el-col>

			</el-collapse-item>

			</el-collapse>
			</el-col>

			</el-tab-pane >

			<el-tab-pane  label="工作票终结">

			<el-col   :span="24" >
			<el-card class="mb-20" shadow ="always">

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_allworkendtime')" >
                <el-form-item  label="全部工作结束时间"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_allworkendtime" >
                    <el-time-picker   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_allworkendtime" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_allworkendtime')" 
 placeholder="请选择"  clearable  :style='{"width":"100%"}' format="HH:mm:ss"  value-format="HH:mm:ss"  :picker-options='{"selectableRange":"00:00:00-23:59:59"}'>
                </el-time-picker>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workprincipalusersignatureprofileid')" >
                <el-form-item  label="工作负责人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workprincipalusersignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workprincipalusersignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workprincipalusersignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workpermissionusesignatureprofileid')" >
                <el-form-item  label="工作许可人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workpermissionusesignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workpermissionusesignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workpermissionusesignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

			</el-card>
        	</el-col>

			<el-col   :span="24" >
			<el-card class="mb-20" shadow ="always">

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillgroundlinenum')" >
                <el-form-item  label="接地线总组数"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillgroundlinenum" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillgroundlinenum" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillgroundlinenum')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhastearnum')" >
                <el-form-item  label="已拆除"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhastearnum" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhastearnum" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhastearnum')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbilltotalswitchnum')" >
                <el-form-item  label="接地闸刀总组数"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbilltotalswitchnum" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbilltotalswitchnum" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbilltotalswitchnum')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhasstartswitchnum')" >
                <el-form-item  label="已拉开"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhasstartswitchnum" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhasstartswitchnum" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhasstartswitchnum')" 
 placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>

			</el-card>
        	</el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkprincipaluserisignatureprofileid')" >
                <el-form-item  label="工作负责人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkprincipaluserisignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkprincipaluserisignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkprincipaluserisignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkpermissionusesignatureprofileid')" >
                <el-form-item  label="工作许可人签名"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkpermissionusesignatureprofileid" >
                    <HONGAN4D-UploadImg   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkpermissionusesignatureprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkpermissionusesignatureprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9" >
                </HONGAN4D-UploadImg>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillremark')" >
                <el-form-item  label="备注"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillremark" >
                    <el-input   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillremark" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillremark')" 
 placeholder="请输入"  :style='{"width":"100%"}' true  type="textarea"  :autosize='{"minRows":4,"maxRows":4}' >
                </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_profileid')" >
                <el-form-item  label="附件"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_profileid" >
                    <HONGAN4D-UploadFz   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_profileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_profileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >
                </HONGAN4D-UploadFz>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_finishworkprofileid')" >
                <el-form-item  label="每日开工收工表"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_finishworkprofileid" >
                    <HONGAN4D-UploadFz   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_finishworkprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_finishworkprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >
                </HONGAN4D-UploadFz>
                </el-form-item>
            </el-col>

            <el-col :span="24"  v-if="judgeShow('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_guaranteeprofileid')" >
                <el-form-item  label="执行工作票保证书"  
 prop="hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_guaranteeprofileid" >
                    <HONGAN4D-UploadFz   v-model=" dataForm.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_guaranteeprofileid" :disabled="judgeWrite('hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_guaranteeprofileid')" 
 :fileSize="5"    sizeUnit="MB"  :limit="9"  buttonText="点击上传" >
                </HONGAN4D-UploadFz>
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
									creationtime : "",
									workticketno : '',
									workbillsigneruserid : '',
									workpermissionuserid : '',
									workprincipaluserid : '',
					prorunning_firstworkticket_change_personList:[],
					prorunning_firstworkticket_change_person_leaveList:[],
					prorunning_firstworkticket_change_delayList:[],
                    			prorunning_firstworkticket_implement:
			                    {
			                                dutyofficersignatureid:'',
			                                creationtime:'',
			                                workpermissionusersignatureprofileid:'',
			                                safemeasureone:'',
			                                safemeasuretwo:'',
			                                safemeasurethree:'',
			                                safemeasurefour:'',
			                                dutyofficersignatureprofileid:'',
			                                permissionstarttime:'',
			                                workpermissionusesignatureprofileid:'',
			                                workprincipalusersignatureprofileid:'',
                    },
                    			prorunning_firstworkticket_content:
			                    {
			                                projectguid:'',
			                                workprincipaluserid:'',
			                                groupteamid:'',
			                                workteamids:'',
			                                scenesafeuserid:'',
			                                workcontent:'',
			                                workaddress:'',
			                                planstarttime:'',
			                                planendtime:'',
			                                safemeasureone:'',
			                                safemeasuretwo:'',
			                                safemeasurethree:'',
			                                workbillsignersignatureprofileid:'',
			                                workprincipalusersignatureprofileid:'',
                    },
                    			prorunning_firstworkticket_change:
			                    {
			                                isapproved:'',
			                                leavereason:'',
			                                newworkprincipaluserid:'',
			                                changetime:'',
			                                workbillsignersignatureprofileid:'',
			                                ispersonchange:'',
			                                isdelay:'',
                    },
                    			prorunning_firstworkticket_end:
			                    {
			                                allworkendtime:'',
			                                workprincipalusersignatureprofileid:'',
			                                workpermissionusesignatureprofileid:'',
			                                workbillgroundlinenum:'',
			                                workbillhastearnum:'',
			                                workbilltotalswitchnum:'',
			                                workbillhasstartswitchnum:'',
			                                workbillworkprincipaluserisignatureprofileid:'',
			                                workbillworkpermissionusesignatureprofileid:'',
			                                workbillremark:'',
			                                profileid:'',
			                                finishworkprofileid:'',
			                                guaranteeprofileid:'',
                    },
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipaluserid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_groupteamid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workteamids:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_scenesafeuserid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workcontent:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workaddress:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planstarttime:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planendtime:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasureone:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasuretwo:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasurethree:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workbillsignersignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipalusersignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_creationtime:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusersignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasureone:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasuretwo:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurethree:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurefour:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_permissionstarttime:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusesignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workprincipalusersignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapproved:'',
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_leavereason:'',
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_newworkprincipaluserid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_changetime:'',
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_workbillsignersignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_ispersonchange:'',
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isdelay:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_allworkendtime:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workprincipalusersignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workpermissionusesignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillgroundlinenum:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhastearnum:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbilltotalswitchnum:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhasstartswitchnum:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkprincipaluserisignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkpermissionusesignatureprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillremark:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_profileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_finishworkprofileid:'',
                    hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_guaranteeprofileid:'',
            },
			tableRequiredData: {},
                            activeatduse:'2',
                            activepqhvqn:["2","TeO7K21"],
				dataRule:
            {
            },

                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguidOptions:[],
                    hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_groupteamidOptions:[{"fullName":"选项一","id":"1"},{"fullName":"选项二","id":"2"}],
                    hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapprovedOptions:[{"fullName":"是","id":"1"},{"fullName":"否","id":"0"}],
			}
		},
		computed: {
			formOperates() {
				return this.setting.formOperates
			}
		},
        watch: {},
		created() {
                    this.gethongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguidOptions();
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
                    gethongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguidOptions() {
                        getDataInterfaceRes('306039649598439557').then(res => {
							let data = this.com.hongan4d.interfaceDataHandler(res.data)
                            this.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_projectguidOptions = data
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
                            url: '/api/example/ProRunning_FirstWorkTicket/'+this.dataForm.id,
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
                        url: '/api/example/ProRunning_FirstWorkTicket',
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
                        url: '/api/example/ProRunning_FirstWorkTicket/'+this.dataForm.id,
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
                addprorunning_firstworkticket_change_personList(){
                    let item = {
							username:undefined,
							tm:undefined,
							workprincipalusername:undefined,
                }
                    this.dataForm.prorunning_firstworkticket_change_personList.push(item)
                },
                delprorunning_firstworkticket_change_personList(index) {
                    this.dataForm.prorunning_firstworkticket_change_personList.splice(index, 1);
                },
                addprorunning_firstworkticket_change_person_leaveList(){
                    let item = {
							username:undefined,
							tm:undefined,
							workprincipalusername:undefined,
                }
                    this.dataForm.prorunning_firstworkticket_change_person_leaveList.push(item)
                },
                delprorunning_firstworkticket_change_person_leaveList(index) {
                    this.dataForm.prorunning_firstworkticket_change_person_leaveList.splice(index, 1);
                },
                addprorunning_firstworkticket_change_delayList(){
                    let item = {
							validovertime:undefined,
							workprincipalusersignatureprofileid:undefined,
							workpermissionusesignatureprofileid:undefined,
                }
                    this.dataForm.prorunning_firstworkticket_change_delayList.push(item)
                },
                delprorunning_firstworkticket_change_delayList(index) {
                    this.dataForm.prorunning_firstworkticket_change_delayList.splice(index, 1);
                },
            dataList(){
                var _data = JSON.parse(JSON.stringify(this.dataForm));
                          _data.prorunning_firstworkticket_content.workteamids = JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workteamids)
                        _data.prorunning_firstworkticket_content.workcontent = _data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workcontent
                        _data.prorunning_firstworkticket_content.workaddress = _data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workaddress
                        _data.prorunning_firstworkticket_content.planstarttime = _data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planstarttime
                        _data.prorunning_firstworkticket_content.planendtime = _data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planendtime
                        _data.prorunning_firstworkticket_content.safemeasureone = _data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasureone
                        _data.prorunning_firstworkticket_content.safemeasuretwo = _data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasuretwo
                        _data.prorunning_firstworkticket_content.safemeasurethree = _data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasurethree
                         _data.prorunning_firstworkticket_content.workbillsignersignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workbillsignersignatureprofileid)
                         _data.prorunning_firstworkticket_content.workprincipalusersignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipalusersignatureprofileid)
                        _data.prorunning_firstworkticket_implement.creationtime = _data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_creationtime
                         _data.prorunning_firstworkticket_implement.workpermissionusersignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusersignatureprofileid)
                        _data.prorunning_firstworkticket_implement.safemeasureone = _data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasureone
                        _data.prorunning_firstworkticket_implement.safemeasuretwo = _data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasuretwo
                        _data.prorunning_firstworkticket_implement.safemeasurethree = _data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurethree
                        _data.prorunning_firstworkticket_implement.safemeasurefour = _data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurefour
                         _data.prorunning_firstworkticket_implement.dutyofficersignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureprofileid)
                        _data.prorunning_firstworkticket_implement.permissionstarttime = _data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_permissionstarttime
                         _data.prorunning_firstworkticket_implement.workpermissionusesignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusesignatureprofileid)
                         _data.prorunning_firstworkticket_implement.workprincipalusersignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workprincipalusersignatureprofileid)
                        _data.prorunning_firstworkticket_change.isapproved = _data.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapproved
                        _data.prorunning_firstworkticket_change.leavereason = _data.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_leavereason
                        _data.prorunning_firstworkticket_change.changetime = _data.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_changetime
                         _data.prorunning_firstworkticket_change.workbillsignersignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_workbillsignersignatureprofileid)
                        _data.prorunning_firstworkticket_change.ispersonchange = _data.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_ispersonchange
                        _data.prorunning_firstworkticket_change.isdelay = _data.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isdelay
                        _data.prorunning_firstworkticket_end.allworkendtime = _data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_allworkendtime
                         _data.prorunning_firstworkticket_end.workprincipalusersignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workprincipalusersignatureprofileid)
                         _data.prorunning_firstworkticket_end.workpermissionusesignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workpermissionusesignatureprofileid)
                        _data.prorunning_firstworkticket_end.workbillgroundlinenum = _data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillgroundlinenum
                        _data.prorunning_firstworkticket_end.workbillhastearnum = _data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhastearnum
                        _data.prorunning_firstworkticket_end.workbilltotalswitchnum = _data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbilltotalswitchnum
                        _data.prorunning_firstworkticket_end.workbillhasstartswitchnum = _data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhasstartswitchnum
                         _data.prorunning_firstworkticket_end.workbillworkprincipaluserisignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkprincipaluserisignatureprofileid)
                         _data.prorunning_firstworkticket_end.workbillworkpermissionusesignatureprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkpermissionusesignatureprofileid)
                        _data.prorunning_firstworkticket_end.workbillremark = _data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillremark
                         _data.prorunning_firstworkticket_end.profileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_profileid)
                         _data.prorunning_firstworkticket_end.finishworkprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_finishworkprofileid)
                         _data.prorunning_firstworkticket_end.guaranteeprofileid =JSON.stringify(_data.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_guaranteeprofileid)
                    for(let i=0;i<_data.prorunning_firstworkticket_change_personList.length;i++){
                        var _list = _data.prorunning_firstworkticket_change_personList[i];
                    }
                    for(let i=0;i<_data.prorunning_firstworkticket_change_person_leaveList.length;i++){
                        var _list = _data.prorunning_firstworkticket_change_person_leaveList[i];
                    }
                    for(let i=0;i<_data.prorunning_firstworkticket_change_delayList.length;i++){
                        var _list = _data.prorunning_firstworkticket_change_delayList[i];
                                _list.workprincipalusersignatureprofileid = JSON.stringify(_list.workprincipalusersignatureprofileid)
                                _list.workpermissionusesignatureprofileid = JSON.stringify(_list.workpermissionusesignatureprofileid)
                    }
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                                _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workteamids = JSON.parse(_dataAll.prorunning_firstworkticket_content.workteamids)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workcontent = _dataAll.prorunning_firstworkticket_content.workcontent
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workaddress = _dataAll.prorunning_firstworkticket_content.workaddress
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planstarttime = _dataAll.prorunning_firstworkticket_content.planstarttime
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_planendtime = _dataAll.prorunning_firstworkticket_content.planendtime
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasureone = _dataAll.prorunning_firstworkticket_content.safemeasureone
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasuretwo = _dataAll.prorunning_firstworkticket_content.safemeasuretwo
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_safemeasurethree = _dataAll.prorunning_firstworkticket_content.safemeasurethree
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workbillsignersignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_content.workbillsignersignatureprofileid)
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_Content_hongan4d_workprincipalusersignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_content.workprincipalusersignatureprofileid)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_creationtime = _dataAll.prorunning_firstworkticket_implement.creationtime
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusersignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_implement.workpermissionusersignatureprofileid)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasureone = _dataAll.prorunning_firstworkticket_implement.safemeasureone
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasuretwo = _dataAll.prorunning_firstworkticket_implement.safemeasuretwo
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurethree = _dataAll.prorunning_firstworkticket_implement.safemeasurethree
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_safemeasurefour = _dataAll.prorunning_firstworkticket_implement.safemeasurefour
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_dutyofficersignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_implement.dutyofficersignatureprofileid)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_permissionstarttime = _dataAll.prorunning_firstworkticket_implement.permissionstarttime
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workpermissionusesignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_implement.workpermissionusesignatureprofileid)
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_Implement_hongan4d_workprincipalusersignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_implement.workprincipalusersignatureprofileid)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isapproved = _dataAll.prorunning_firstworkticket_change.isapproved
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_leavereason = _dataAll.prorunning_firstworkticket_change.leavereason
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_changetime = _dataAll.prorunning_firstworkticket_change.changetime
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_workbillsignersignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_change.workbillsignersignatureprofileid)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_ispersonchange = _dataAll.prorunning_firstworkticket_change.ispersonchange
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_Change_hongan4d_isdelay = _dataAll.prorunning_firstworkticket_change.isdelay
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_allworkendtime = _dataAll.prorunning_firstworkticket_end.allworkendtime
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workprincipalusersignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_end.workprincipalusersignatureprofileid)
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workpermissionusesignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_end.workpermissionusesignatureprofileid)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillgroundlinenum = _dataAll.prorunning_firstworkticket_end.workbillgroundlinenum
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhastearnum = _dataAll.prorunning_firstworkticket_end.workbillhastearnum
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbilltotalswitchnum = _dataAll.prorunning_firstworkticket_end.workbilltotalswitchnum
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillhasstartswitchnum = _dataAll.prorunning_firstworkticket_end.workbillhasstartswitchnum
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkprincipaluserisignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_end.workbillworkprincipaluserisignatureprofileid)
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillworkpermissionusesignatureprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_end.workbillworkpermissionusesignatureprofileid)
                        _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_workbillremark = _dataAll.prorunning_firstworkticket_end.workbillremark
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_profileid = JSON.parse(_dataAll.prorunning_firstworkticket_end.profileid)
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_finishworkprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_end.finishworkprofileid)
                            _dataAll.hongan4d_ProRunning_FirstWorkTicket_End_hongan4d_guaranteeprofileid = JSON.parse(_dataAll.prorunning_firstworkticket_end.guaranteeprofileid)
                    for(let i=0;i<_dataAll.prorunning_firstworkticket_change_personList.length;i++){
                        var _list = _dataAll.prorunning_firstworkticket_change_personList[i];
                    }
                    for(let i=0;i<_dataAll.prorunning_firstworkticket_change_person_leaveList.length;i++){
                        var _list = _dataAll.prorunning_firstworkticket_change_person_leaveList[i];
                    }
                    for(let i=0;i<_dataAll.prorunning_firstworkticket_change_delayList.length;i++){
                        var _list = _dataAll.prorunning_firstworkticket_change_delayList[i];
                                _list.workprincipalusersignatureprofileid = JSON.parse(_list.workprincipalusersignatureprofileid)
                                _list.workpermissionusesignatureprofileid = JSON.parse(_list.workpermissionusesignatureprofileid)
                    }
                this.dataForm = _dataAll
            },
        },
    }

</script>
