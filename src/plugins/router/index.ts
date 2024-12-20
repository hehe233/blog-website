import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import { useMenuStore } from '@/stores';
import Layout from '@/layout/index.vue';
import blogRouter from './modules/blog';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    name: '404',
    meta: { title: '无法找到页面', hidden: true }
  },
  blogRouter
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((_to, _from, next) => {
  NProgress.start();
  const menuStore = useMenuStore() || {};
  menuStore.initTagsData();
  menuStore.initCategoriesData();
  menuStore.initStickyArticles();
  menuStore.initArticlesCount();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export {
  router,
  routes,
  blogRouter
};