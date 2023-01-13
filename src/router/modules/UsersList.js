import layout from '@/layout'

export default {
  path: '/userslist',
  name: 'UsersList',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/usersList'),
      meta: {
        title: '员工管理',
        icon: 'user'
      }
    }
  ]
}
