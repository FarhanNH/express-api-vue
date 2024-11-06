import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/IndexPage.vue'),
  },
  {
    path: '/posts',
    name: 'posts.index',
    component: () => import('@/views/posts/IndexPage.vue'),
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: () => import('@/views/posts/CreatePage.vue'),
  },
  {
    path: '/posts/edit/:id',
    name: 'posts.edit',
    component: () => import('@/views/posts/EditPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
