<template>
  <div>
    <!-- 头部导入导出 -->
    <PageTools>
      <template v-slot:before>
        <span>共16条记录</span>
      </template>
      <template slot="after">
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
        <el-button size="small" type="primary">新增员工</el-button>
      </template>
    </PageTools>

    <!-- 放置表格和分页 -->
    <el-card>
      <el-table border>
        <el-table-column label="序号" sortable="" width="80" />
        <el-table-column label="姓名" />
        <el-table-column label="工号" />
        <el-table-column label="聘用形式" />
        <el-table-column label="部门" />
        <el-table-column label="入职时间" sortable="" />
        <el-table-column label="账户状态" />
        <el-table-column label="操作" fixed="right" width="280">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" />
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HrsaasIndex',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
