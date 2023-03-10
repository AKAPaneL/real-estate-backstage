import layout from '@/layout'

export default {
  path: '/pageslist',
  name: 'PagesList',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/pages-list'),
      meta: {
        title: '页面管理',
        icon: 'nested'
      }
    }
  ]
}
