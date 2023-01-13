import layout from '@/layout'

export default {
  path: '/propertieslist',
  name: 'PropertiesList',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/properties-list'),
      meta: {
        title: '房产管理',
        icon: 'example'
      }
    }
  ]
}
