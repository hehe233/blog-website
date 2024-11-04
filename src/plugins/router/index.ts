import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import blogrouter from './modules/blog'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    name: '404',
    meta: { title: '无法找到页面', hidden: true }
  },
  ...blogrouter,
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
});