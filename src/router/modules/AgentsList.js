import layout from '@/layout'

export default {
  path: '/agentslist',
  name: 'AgentsList',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/agents-list'),
      meta: {
        title: '经济人管理',
        icon: 'user'
      }
    }
  ]
}
