import layout from '@/layout'

export default {
  path: '/clientslist',
  name: 'clientslist',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/clients-list'),
      meta: {
        title: '客户管理',
        icon: 'lock'
      }
    }
  ]
}
