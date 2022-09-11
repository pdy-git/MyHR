import Layout from '@/layout'

export default {
  path: '/permission', // 路由地址
  name: 'permission',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}

