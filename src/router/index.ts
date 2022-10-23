import {createRouter, createWebHistory} from 'vue-router';

import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/records',
    name: 'records',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/categories',
    name: 'category',
    component: () => import('@/views/CategoryView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView.vue')
  },
  {
    path: '/password-forgot',
    name: 'password-forgot',
    component: () => import('@/views/PasswordForgetView.vue')
  },
  {
    path: '/password-reset/:token',
    name: 'password-reset',
    component: () => import('@/views/PasswordResetView.vue')
  },
  {
    path: '/activate/:token',
    name: 'activate',
    component: () => import('@/views/ActivationView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
