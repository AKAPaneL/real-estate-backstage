import layout from '@/layout'

export default {
  path: '/propertieslist',
  name: 'propertieslist',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/properties-list'),
      meta: {
        title: '房产管理',
        icon: 'lock'
      }
    }
  ]
}
