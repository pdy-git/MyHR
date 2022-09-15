<template>
  <div style="padding:20px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <!-- 按钮 -->
        <el-row style="height:60px">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog=true">新增角色</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table :data="list" border style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="120" />
          <el-table-column align="center" prop="name" label="角色名称" width="240" />
          <el-table-column align="center" prop="description" label="描述" />
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" justify="end" style="height: 60px" align="middle">
          <el-pagination
            background
            :current-page="page.page"
            :page-size="page.pagesize"
            :total="page.total"
            layout="prev, pager, next"
            @current-change="pageChange"
          />
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <!-- 警告框 -->
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
        />
        <!-- form表单 -->
        <template>
          <el-form :data="formData" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" type="text" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" type="text" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mailbox" type="text" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>

          </el-form>
        </template>
      </el-tab-pane>

    </el-tabs>
    <!-- 显示弹层 -->
    <el-dialog title="修改角色" :visible="showDialog" @close="handleClose">

      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="80px">
        <el-form-item
          label="角色"
          prop="name"
        >
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>

        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button type="primary" @click="btnOk">确定</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-col>
        </el-row>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'HrsaasIndex',
  data() {
    return {
      showDialog: false,
      activeName: 'first',
      list: [],
      formData: [],
      page: {
        page: 1,
        pagesize: 1,
        total: 0
      },
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色必填', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page)
      this.list = rows
      this.page.total = total
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(this.mapGetters)
      this.formData = res
    },
    pageChange(val) {
      this.page.pagesize = val
      this.getRoleList()
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确定删除该角色吗')
        await deleteRole(id)
        this.getRoleList() // 重新渲染数据
        this.$message.success('删除成功') // 删除提示成功
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        // 只有通过校验情况下 ， 才会执行下面内容
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }

        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    handleClose() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
