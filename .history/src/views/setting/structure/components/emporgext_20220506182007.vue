<!--
 * @Author: gongnan
 * @Date: 2022-05-06 10:43:15
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-06 18:20:07
 * @Description: file content
 * @FilePath: \front\src\views\setting\structure\components\emporgext.vue
-->
<template>
	<div>
		<div class="mb30">
			<!--      标题-->
			<div class="flex justify-space-between mb30" style="padding: 0 15px">
				<div class="flex">
					<div class="approva-lump" />
					<div class="fz-14 fw-600">附属部门</div>
				</div>
				<el-button plain size="small" type="primary" @click="addProduct">
					<el-icon class="el-icon--left">
						<Plus />
					</el-icon>
					添加附属部门
				</el-button>
			</div>
			<!--      头部-->
			<div class="flex justify-space-between align-items productTable">
				<div class="fz-14 wp-260">部门名称</div>
				<div class="text-right fz-14 wp-150">岗位名称</div>
				<!-- <div class="text-right fz-14 wp-140">岗位编码</div> -->
				<div class="text-right fz-14 wp-110">操作</div>
			</div>
			<!--      内容-->
			<el-form ref="formRef" label-width="0px" :model="produceLists" :rules="rules">
				<div class="flex mb15 justify-space-between align-items productTableItem" v-for="(val, index) in emporgLists.emp">
					<div class="wp-260">
						<el-form-item :prop="'emp.' + index + '.OrgId'" :rules="rules.productValue">
							<el-tree-select @clear="onclearData" @change="OnEmpOrgChange" class="treeselect" v-model="val.OrgId" :data="groupTree" clearable />
						</el-form-item>
					</div>
					<div class="wp-150">
						<el-form-item :prop="'emp.' + index + '.PosId'" :rules="rules.price">
							<el-select v-model="val.PosId" filterable clearable placeholder="请选择岗位" style="width:100%" @clear="clearSelect" @change="chgSelect">
								<el-option v-for="item in positionList" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</div>
					<div class="text-right wp-140">
						{{ val.productLimit }}
					</div>
					<div class="text-right wp-110" @click="deleteProduct(index)">
						<el-button type="text">移除</el-button>
					</div>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		ElMessage,
		ElMessageBox
	} from "element-plus";
	import {
		Plus
	} from "@element-plus/icons-vue";
	import {
		getCurrentInstance,
		reactive,
		ref
	} from "vue";
	import {
		alltree
	} from "@/api/setting/structure/index";
	import {
		sysPosList
	} from '@/api/setting/structure/position.js'
	import {
		contract_rules
	} from "@/utils/rules/contract";
	export default {
		name: "EmpOrgPos",
		props: {
			// 组织机构列表
			OrgTree: {
				type: Array,
				default: [],
			},
			// 岗位列表
			PosList: {
				type: Array,
				default: [],
			}
		},
		components: {
			Plus
		},
		setup(props, {
			emit
		}) {
			const baseorgid = ref() // 直属机构选择的id
			const treeLoading = ref(false);
			const positionList = reactive(props.PosList) // 职位列表
			const {
				appContext
			} = getCurrentInstance();
			const _this = appContext.config.globalProperties;
			const groupTree = reactive(props.OrgTree); // 组织结构树
			const rules = contract_rules; // 正则校验
			const emporgLists = reactive({
				emp: [{
					OrgId: "",
					OrgCode: '',
					OrgName: '',
					PosId: '',
					PosCode: '',
					PosName: '',
				}, ],
			});
			//选择产品，并赋值价格，期限
			const changeProduct = (index) => {
				const value = productOptions.value.filter((item) => {
					return item.name === produceLists.produce[index].productValue;
				});
				if (value) {
					produceLists.produce[index].price = value[0].price;
					produceLists.produce[index].productLimit = value[0].timE_LIMIT;
				}
			};
			const onclearData = (val) => {}
			// 附属部门变动时禁用已经选择的部门
			const OnEmpOrgChange = (val) => {
				var datas = getTreeitem(groupTree, val)
				if (datas) {
					datas.disabled = true
				}
			}
			// 当直属机构选择时禁用直属机构已经选择的机构
			const onBaseOrgChange = (val) => {
				baseorgid.value = val
				var datas = getTreeitem(groupTree, val)
				if (datas) {
					datas.disabled = true
				}
			}
			const getTreeitem = (data, val) => {
				var result = null;
				if (!data) {
					return;
				}
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
					if (item.id === val) {
						result = item;
						return result;
					}
					if (item.children && item.children.length > 0) {
						result = getTreeitem(item.children, val);
						if (result) return result;
					}
					if (!(emporgLists.emp.find(a => a.OrgId == item.id)) && item.id != baseorgid.value) {
						item.disabled = false
					}
				}
			}
			//添加附属部门
			const addProduct = () => {
				emporgLists.emp.push({
					OrgId: "",
					OrgCode: '',
					OrgName: '',
					PosId: '',
					PosCode: '',
					PosName: ''
				});
			};
			//删除附属部门
			const deleteProduct = (index) => {
				emporgLists.emp.splice(index, 1);
			};
			//正则验证并返回数据
			const formRef = ref();
			const getData = () => {
				return emporgLists.emp;
			};
			return {
				formRef,
				emporgLists,
				rules,
				getData,
				addProduct,
				deleteProduct,
				changeProduct,
				groupTree,
				treeLoading,
				positionList,
				onBaseOrgChange,
				OnEmpOrgChange,
				baseorgid,
				onclearData
			};
		},
	};
</script>

<style scoped>
	.productTable {
		padding: 0 15px 10px 30px;
		border-bottom: 1px solid #909399;
	}
	.productTableItem {
		padding: 15px 15px 0px 30px;
		border-bottom: 1px solid #909399;
	}
	.productTableItemCount {
		padding: 0px 15px 15px 30px;
	}
	.wp-260 {
		width: 260px;
	}
	.wp-150 {
		width: 150px;
	}
	.wp-140 {
		width: 140px;
	}
	.wp-110 {
		width: 110px;
	}
</style>
