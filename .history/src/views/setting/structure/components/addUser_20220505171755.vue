<template>
	<scDialog
		:title="title"
		:htitle="htitle"
		:show-fullscreen="true"
		:model-value="visible"
		:destroy-on-close="true"
		:width="800"
		:loading="loading"
		@closed="$emit('close')"
	>
		<el-tabs v-model="tabname">
			<el-tab-pane name="user" label="用户信息">
				<el-form
					:model="form"
					:rules="userrules"
					:disabled="mode == 'show'"
					ref="dialogForm"
					label-width="100px"
					label-position="left"
				>
					<el-form-item label="头像" prop="avatar">
						<sc-upload
							v-model="form.avatar"
							title="上传头像"
						></sc-upload>
					</el-form-item>
					<el-form-item label="登录账号" prop="account">
						<el-input
							v-model="form.account"
							placeholder="用于登录系统"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input
							v-model="form.name"
							placeholder="请输入完整的真实姓名"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="name">
						<el-radio-group v-model="form.resource">
							<el-radio label="男" />
							<el-radio label="女" />
						</el-radio-group>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input
							v-model="form.email"
							placeholder="请输入邮箱信息"
							clearable
						></el-input>
					</el-form-item>
					<template v-if="mode == 'add'">
						<el-form-item label="登录密码" prop="password">
							<el-input
								type="password"
								v-model="form.password"
								clearable
								show-password
							></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="confirmpwd">
							<el-input
								@blur="setPwdValue"
								type="password"
								v-model="form.confirm"
								clearable
								show-password
							></el-input>
						</el-form-item>
					</template>
				</el-form>
			</el-tab-pane>
			<el-tab-pane name="emp" label="员工信息">
				<el-form
					:model="formemp"
					:rules="emprules"
					ref="dialogEmpForm"
					label-width="100px"
					label-position="left"
				>
					<el-form-item label="工号" prop="jobNum">
						<el-input
							v-model="form.jobNum"
							placeholder="用于登录系统"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="直属部门:" prop="limitTime">
						<el-tree-select
							v-model="Empform.orgId"
							:data="groupTree"
						/>
					</el-form-item>
					<el-form-item label="直属岗位:" prop="limitTime">
						<el-tree-select
							v-model="Empform.orgId"
							:data="groupTree"
						/>
					</el-form-item>
					<el-form-item label="附属部门:" prop="limitTime">
						<yySelectTree
							:data="groupTree"
							keyid="id"
							:value="Empform.orgId"
							:label="Empform.orgName"
							placeholder="请选择所属部门"
							class="width-100"
							:loading="treeLoading"
							@change="chgOrgIds"
						></yySelectTree>
					</el-form-item>
					<el-form-item label="附属岗位:" prop="limitTime">
						<yySelectTree
							:data="groupTree"
							keyid="id"
							:value="Empform.orgId"
							:label="Empform.orgName"
							placeholder="请选择所属部门"
							class="width-100"
							:loading="treeLoading"
							@change="chgOrgIds"
						></yySelectTree>
					</el-form-item>
					<div></div>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		<template v-if="tabname === 'emp'" #footer>
			<el-button @click="visible = false"> 取消</el-button>
			<el-button
				type="primary"
				:disabled="roleid.length == 0"
				:loading="isSaveing"
				@click="clkSubmit"
				>确定</el-button
			>
		</template>
	</scDialog>
</template>

<script>
import { roleDropDown, grantRole } from "@/api/setting/structure";
import { ref, getCurrentInstance, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { user_rules } from "@/utils/rules/user";
import { alltree } from "@/api/setting/structure/index";
export default {
	setup(props, context) {
		const { appContext } = getCurrentInstance();
		const treeLoading = ref(false);
		const groupTree = ref([]);
		const tabname = ref("user");
		const mode = ref("add");
		const _this = appContext.config.globalProperties;
		const title = ref("新增用户");
		const htitle = ref("（最多选择5个角色）");
		const options = ref([]);
		const visible = ref(false);
		const roleid = ref([]);
		const isSaveing = ref(false);
		const selectLoading = ref(true);
		const rules = ref();
		const dialogForm = ref();
		const form = reactive({
			id: null,
			name: "",
			email: "",
			account: "",
			password: "",
			confirm: "",
			confirmpwd: {
				pwd: "",
				cpwd: "",
			},
		});
		const Empform = reactive({
			orgId: "",
			orgName: "",
			jobNum: "",
		});
		const setPwdValue = () => {
			form.confirmpwd.pwd = form.password;
			form.confirmpwd.cpwd = form.confirm;
		};
		const userrules = user_rules;
		const row = ref({});
		const data = ref({
			id: "",
			grantRoleIdList: [],
		});
		// 获取组织结构列表
		const getGroupTree = async () => {
			treeLoading.value = true;
			var res = await alltree();
			treeLoading.value = false;
			if (res.code !== 200) {
				ElMessage.error(res.message || "部门加载失败，请稍后重试！");
				return;
			}
			groupTree.value = res.data;
		};
		// 恢复默认角色
		const defaultRole = () => {
			const v = _this.$_.find(options.value, (x) => {
				return x.isdefaultRole === true;
			});
			return v;
		};
		// 获取角色下拉数据
		const getRoleDropDown = async () => {
			selectLoading.value = true;
			var res = await roleDropDown();
			if (res.code !== 200) {
				ElMessage.error(res.message || "角色加载失败，请稍后重试");
				return;
			}
			for (let i = 0, len = res.data.length; i < len; i++) {
				options.value.push({
					label: res.data[i].name,
					value: res.data[i].id,
					isdefaultRole: res.data[i].isdefaultRole,
				});
			}
			// 人员角色为空时，为默认角色s
			if (_this.$_.isEmpty(row.value.roleIds)) {
				roleid.value = [defaultRole().value];
			} else {
				var hasroles = []; // 判断自己有的角色,匹配到才进行显示
				options.value.forEach((r) => {
					var roleinfo = row.value.roleIds.find((a) => a === r.value);
					if (roleinfo) {
						hasroles.push(r.value);
					}
				});
				console.log("findrole", hasroles);
				roleid.value = hasroles; // row.value.roleIds
			}
			selectLoading.value = false;
		};
		// 打开弹窗
		const open = async () => {
			visible.value = true;
		};
		// 点击确定
		const clkSubmit = async () => {
			isSaveing.value = true;
			data.value.grantRoleIdList = roleid.value;
			var res = await grantRole(data.value);
			isSaveing.value = false;
			if (res.code !== 200) {
				ElMessage.error(res.message || "保存失败，请稍后重试");
				return;
			}
			context.emit("close");
			ElMessage.success("保存成功！");
			context.emit("success");
		};
		// 清空角色下拉选择框
		const clearSelect = () => {
			// 暂时未用到
		};
		// 点击角色下拉选择框
		const chgSelect = (val) => {
			if (_this.$_.isEmpty(val)) {
				if (defaultRole()) {
					roleid.value = [defaultRole().value];
				}
			}
		};
		onMounted(async () => {
			await getGroupTree();
		});
		return {
			title,
			htitle,
			options,
			visible,
			roleid,
			isSaveing,
			rules,
			form,
			dialogForm,
			data,
			row,
			selectLoading,
			defaultRole,
			open,
			clkSubmit,
			clearSelect,
			chgSelect,
			mode,
			userrules,
			setPwdValue,
			tabname,
			Empform,
			groupTree,
			treeLoading,
			getGroupTree,
		};
	},
};
</script>

<style></style>
