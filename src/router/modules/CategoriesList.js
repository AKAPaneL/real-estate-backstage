import layout from '@/layout'

export default {
  path: '/categorieslist',
  name: 'CategoriesList',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/category'),
      meta: {
        title: '分类管理',
        icon: 'table'
      }
    }
  ]
}
