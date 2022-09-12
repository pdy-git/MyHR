import Layout from '@/layout'

export default {
  path: '/permission', // 路由地址
  component: Layout,
  children: [{
    name: 'permission',
    path: '',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}

