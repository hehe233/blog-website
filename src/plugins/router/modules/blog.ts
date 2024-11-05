import Layout from '@/layout/index.vue';
import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: { title: '博客' },
  children: [
    {
      path: 'home',
      component: () => import('@/views/home/home.vue'),
      name: 'home',
      meta: { title: '首页', icon: '' }
    },
    {
      path: 'archive',
      component: () => import('@/views/home/home.vue'),
      name: 'archive',
      meta: { title: '归档', icon: '' },
      children: [
        {
          path: 'technology',
          name: 'technology',
          meta: { title: '技术' },
        },
        {
          path: 'project',
          name: 'project',
          meta: { title: '项目' },
        },
      ]
    }
  ]
} as RouteRecordRaw;