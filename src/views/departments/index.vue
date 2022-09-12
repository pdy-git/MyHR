<template>
  <div class="departments-container">
    <el-card class="tree-card">
      <!-- 放置结构内容 -->
      <TreeTools :tree-node="company" :isroot="true" @addDepts="addDepts" />
      <el-tree :data="departs" :props="defaultProps" default-expand-all>
        <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
        <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
        <TreeTools
          slot-scope="{data}"
          :tree-node="data"
          @refreshDepts="getDepartments"
          @addDepts="addDepts"
          @editDepts="editDepts"
        /></el-tree>
    </el-card>
    <!-- 新增输入框 -->
    <AddDept ref="addDepts" :dialog-visible.sync="dialogVisible" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListTotreeData } from '@/utils/index'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      node: null,
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: [],
      dialogVisible: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      // console.log(res)
      this.company = { name: res.companyName, manager: res.companyManage, id: '' }
      this.departs = tranListTotreeData(res.depts, '')
    },
    // node 是点击的部门
    addDepts(node) {
      this.dialogVisible = true
      this.node = node
    },
    editDepts(node) {
      this.dialogVisible = true
      this.node = node
      console.log(this.$refs.addDepts)
      this.$refs.addDepts.getDepartDetail(node.id)
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  // .el-tree {
  //   .el-tree-node__content {
  //     padding-right: 20px;
  //   }
  // }
}
</style>
