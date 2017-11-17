import RecordsPage from './components/records/RecordsPage.vue';
import CategoriesPage from './components/categories/CategoriesPage.vue';
import LoginPage from './components/auth/LoginPage.vue';
import SignUpPage from './components/auth/SignUpPage.vue';
import PasswordForgotPage from './components/auth/PasswordForgotPage.vue';
import PasswordResetPage from './components/auth/PasswordResetPage.vue';
import ActivationPage from './components/auth/ActivationPage.vue';
import NotFoundPage from './components/NotFoundPage.vue';

export const routes = [
  {
    path: '/records',
    name: 'records',
    component: RecordsPage
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  },
  {
    path: '/password-forgot',
    name: 'password-forgot',
    component: PasswordForgotPage
  },
  {
    path: '/password-reset/:token',
    name: 'password-reset',
    component: PasswordResetPage
  },
  {
    path: '/activate/:token',
    name: 'activate',
    component: ActivationPage
  },
  {
    path: '/',
    name: 'home',
    component: RecordsPage
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFoundPage
  }
];
