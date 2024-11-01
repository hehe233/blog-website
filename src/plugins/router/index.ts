import { createWebHistory, createRouter } from 'vue-router';
import Layout from '@/layout/index.vue';

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    hidden: true,
    redirect: '/home'
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/error/404.vue'),
    name: '404',
    meta: { title: '无法找到页面' }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});