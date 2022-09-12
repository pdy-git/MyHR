<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 放置下拉菜单 -->
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isroot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isroot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {

  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isroot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 添加子部门,在当前点击的部门下添加子部门=>this.treeNode就是当前点击的部门
        // 触发一个自定义事件 告诉父组件显示弹窗层
        this.$emit('addDepts', this.treeNode)
        console.log(this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDepts', this.treeNode)
      } else {
        this.$confirm('确定要删除该部门吗？')
          .then(() => {
            delDepartments(this.treeNode.id)
            this.$emit('refreshDepts') // 触发自定义事件
            this.$message.success('删除部门成功')
          })
      }
    }
  }

}
</script>

<style>

</style>
