import layout from '@/layout'

export default {
  path: '/roleslist',
  name: 'roleslist',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/rolesList'),
      meta: {
        title: '角色管理',
        icon: 'tree'
      }
    }
  ]
}
