<template>
  <div>
    <!-- 头部导入导出 -->
    <PageTools>
      <template v-slot:before>
        <span>共{{ total }}条记录</span>
      </template>
      <template slot="after">
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportData">导出</el-button>
        <el-button size="small" type="primary" @click="addshowDialog">新增员工</el-button>
      </template>
    </PageTools>

    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" :formatter="formatEmployment" sortable="" prop="formOfEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <!-- 作用域插槽 -->
          <template slot-scope="obj">
            {{ obj.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <el-switch
            v-model="value"
          />
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="total,  prev, pager, next, sizes"
          :current-page="page.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.size"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-card>
    <!--新增员工组件 -->
    <!-- sync修饰符是 组件 去改变父组件的数据的一个语法糖 -->
    <AddEmployee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './component/add-employee.vue'

export default {
  name: 'HrsaasIndex',
  components: {
    AddEmployee
  },
  data() {
    return {
      value: false,
      loading: false,
      showDialog: false,
      list: [], // 接数据的
      page: {
        page: 1, // 当前页码
        size: 10
      },
      total: 0 // 总数

    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.page)
      this.list = rows
      this.total = total
      console.log(rows)
    },
    handleSizeChange(val) {
      this.page.size = val
      this.getEmployeeList() // 重新拉取数据
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getEmployeeList() // 重新拉取数据
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(ele => ele.id === cellValue * 1)
      return obj ? obj.value : '非正式'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除吗')
        await delEmployee(id)
        this.getEmployeeList() // 重新拉取数据
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    addshowDialog() {
      this.showDialog = true
    },
    exportData() {
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: ['姓名', '工资'], // 表头 必填  ['姓名', '手机号', '入职日期', '聘用形式']
          data: [['张三', 2000], ['李四', 5000]] // 具体数据 必填 [['张三', '13399999', '2020-2020-2020', '正式']]

        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
