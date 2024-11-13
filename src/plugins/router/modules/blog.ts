import Layout from '@/layout/index.vue';
import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: { title: '博客', hidden: true },
  children: [
    {
      path: 'home',
      component: () => import('@/views/home/home.vue'),
      name: 'home',
      meta: { title: '首页', icon: 'fa-regular fa-house' }
    },
    {
      path: 'journals',
      component: () => import('@/views/journals/journals.vue'),
      name: 'journals',
      meta: { title: '动态', icon: 'fa-regular fa-pen-swirl' }
    },
    {
      path: 'comment',
      component: () => import('@/views/comment/comment.vue'),
      name: 'comment',
      meta: { title: '留言', icon: 'fa-regular fa-message-dots' }
    },
    {
      path: 'about',
      component: () => import('@/views/about/about.vue'),
      name: 'about',
      meta: { title: '关于', icon: 'fa-regular fa-address-card' }
    },
    {
      path: 'links',
      component: () => import('@/views/links/links.vue'),
      name: 'links',
      meta: { title: '友链', icon: 'fa-regular fa-link-horizontal' }
    },
    {
      path: 'search',
      component: () => import('@/views/search/search.vue'),
      name: 'search',
      meta: { title: '搜索结果', hidden: true }
    },
    {
      path: 'archives',
      component: () => import('@/views/archives/archives.vue'),
      name: 'archives',
      meta: { title: '归档', icon: 'fa-regular fa-archive' },
      children: [
        {
          path: 'categories',
          component: () => import('@/views/categories/categories.vue'),
          name: 'categories',
          meta: { title: '全部分类', icon: 'fa-regular fa-grid-2' },
        },
        {
          path: 'tags',
          component: () => import('@/views/tags/tags.vue'),
          name: 'tags',
          meta: { title: '全部标签', icon: 'fa-regular fa-tags' },
        },
      ]
    }
  ]
} as RouteRecordRaw;