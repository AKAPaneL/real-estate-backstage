import layout from '@/layout'

export default {
  path: '/permissionlist',
  name: 'PermissionsList',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission-list'),
      meta: {
        title: '权限管理',
        icon: 'password'
      }
    }
  ]
}
