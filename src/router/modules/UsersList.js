import layout from '@/layout'

export default {
  path: '/userslist',
  name: 'userslist',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/users-list'),
      meta: {
        title: '员工管理',
        icon: 'lock'
      }
    }
  ]
}
