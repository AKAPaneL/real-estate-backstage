import layout from '@/layout'

export default {
  path: '/clientslist',
  name: 'ClientsList',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/clients-list'),
      meta: {
        title: '客户管理',
        icon: 'form'
      }
    }
  ]
}
