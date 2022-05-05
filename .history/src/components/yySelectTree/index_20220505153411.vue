<!--
 * @Author: gongnan
 * @Date: 2022-04-24 11:28:11
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 15:34:10
 * @Description: file content
 * @FilePath: \front\src\components\yySelectTree\index.vue
-->
<template>
  <el-select v-model="mineStatus" :placeholder="placeholder" :multiple="multiple" @change="selectChange">
      <el-option :value="mineStatusValue" style="height: auto;padding: 0 ">
        <el-tree :data="data" show-checkbox node-key="id" style="width:100%" ref="tree" highlight-current :props="defaultProps"
          @check-change="handleCheckChange"></el-tree>
      </el-option>
    </el-select>
</template>

<script>
export default {
      data() {
        return {
          mineStatus: "",
          mineStatusValue: [],
          defaultProps: {
            children: "children",
            label: "label"
          }
        }
      },
      props:{
        data: {type: Array, default: []},
        placeholder: {type: String, default: ''},
		multiple:{type:Boolean,default:false}
      },
      methods: {
        selectChange(e) {
          var arrNew = [];
          var dataLength = this.mineStatusValue.length;
          var eleng = e.length;
          for (let i = 0; i < dataLength; i++) {
            for (let j = 0; j < eleng; j++) {
              if (e[j] === this.mineStatusValue[i].label) {
                arrNew.push(this.mineStatusValue[i])
              }
            }
          }
          this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
        },
        handleCheckChange() {
          let res = this.$refs.tree.getCheckedNodes(true, true);
          //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
          let arrLabel = [];
          let arr = [];
          let arrIds = [];
          res.forEach(item => {
            arrLabel.push(item.label);
            arr.push(item);
            arrIds.push(item.id)
          });
          this.mineStatusValue = arr;
          this.mineStatus = arrLabel;
          this.$emit('change', arrIds)
          // console.log('this.mineStatusValue',this.mineStatusValue)
        }
      }
}
  </script>
