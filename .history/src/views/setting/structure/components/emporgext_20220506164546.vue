<!--
 * @Author: gongnan
 * @Date: 2022-05-06 10:43:15
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-06 16:45:46
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
							<el-tree-select class="treeselect" v-model="val.OrgId" :data="groupTree" clearable />
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
			OrgTree: {
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
			console.log(props.OrgTree)
			const treeLoading = ref(false);
			const groupTree = ref(props.OrgTree); // 组织结构树
			const positionList = ref([]) // 职位列表
			const {
				appContext
			} = getCurrentInstance();
			const _this = appContext.config.globalProperties;
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
			// 获取岗位列表下拉数据
			const getPositionsList = async() => {
				var res = await sysPosList();
				if (res.code !== 200) {
					ElMessage.error(res.message || "岗位列表加载失败，请稍后重试");
					return;
				}
				positionList.value = []
				res.data.forEach(v => {
					positionList.value.push({
						label: v.name,
						value: v.id
					})
				})
			}
			getPositionsList()
			//改变原有的价格
			const priceChnage = (index) => {
				//获取标准价格
				const name = produceLists.produce[index].productValue;
				if (!name) {
					return;
				}
				const value = productOptions.value.filter((item) => {
					return item.name === name;
				});
				if (value) {
					if (produceLists.produce[index].price.toString() === value[0].price.toString()) {
						emit("change", false);
					} else {
						emit("change", true);
					}
				}
			};
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
			// 获取组织结构列表
			const getGroupTree = async() => {
				treeLoading.value = true;
				var res = await alltree();
				treeLoading.value = false;
				if (res.code !== 200) {
					ElMessage.error(res.message || "部门加载失败，请稍后重试！");
					return;
				}
				groupTree.value = res.data;
			};
			// getGroupTree();
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
				getGroupTree,
				priceChnage,
				getPositionsList,
				positionList
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
