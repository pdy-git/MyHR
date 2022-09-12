<template>
  <!-- 弹出框 -->
  <el-dialog
    :title="showTitle"
    :visible="dialogVisible"
    @close="handleClose"
  >
    <!-- form表单 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="3" style="width:80%" placeholder="1-300个字符" />
      </el-form-item>
    </el-form>

    <!-- button按钮 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>

  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },

  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑校验
        isRepeat = depts.filter(item => item.id !== this.formData.id && item.pid === this.treeNode.pid)
          .some(item => item.name === value)
      } else {
        isRepeat = depts.filter((item) => item.pid === this.treeNode.id)
          .some(item => item.name === value)
      }

      isRepeat ? callback(new Error(`同级部门下已经${value}这个部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      // 获取最新组织架构数据
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑校验
        isRepeat = depts.filter(item => item.id !== this.formData.id).some((item) => item.code === value && value)
      } else {
        // 新增校验
        isRepeat = depts.some((item) => item.code === value && value)
      }
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }

    return {
      formData: {
      // 定义一个表单数据
        name: '', // 部门名称
        code: '', // 部门编号
        manager: '', // 部门负责人
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },

      peoples: [] // 接收获取的员工简单列表的数据
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      const res = await getEmployeeSimple()
      this.peoples = res
    },
    btnOk() {
      this.$refs.deptForm.validate(async(isOk) => {
        if (isOk) {
          if (this.formData.id) {
            // 编辑部门
            await updateDepartments(this.formData)
          } else {
            // 校验通过 传入id
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }

          // 更新列表
          this.$emit('addDepts')

          // 关闭弹窗 会触发dialog事件
          this.$emit('update:dialogVisible', false)
        }
      })
    },
    handleClose() {
      // 关闭弹窗
      this.$emit('update:dialogVisible', false)
      // 重置表单数据
      this.$refs.deptForm.resetFields()
      // 复原初始化数据
      this.formData = {
        name: '',
        code: '',
        manager: '',
        indtroduce: ''
      }
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style>

</style>
