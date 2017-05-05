
export const routes = [
  {
    path: '/records',
    name: 'records',
    component: require('./components/records/RecordsPage.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: require('./components/categories/CategoriesPage.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: require('./components/settings/SettingsPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: require('./components/auth/LoginPage.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: require('./components/auth/SignUpPage.vue')
  },
  {
    path: '/password-forgot',
    name: 'password-forgot',
    component: require('./components/auth/PasswordForgotPage.vue')
  },
  {
    path: '/password-reset/:token',
    name: 'password-reset',
    component: require('./components/auth/PasswordResetPage.vue')
  },
  {
    path: '/activate/:token',
    name: 'activate',
    component: require('./components/auth/ActivationPage.vue')
  },
  {
    path: '/',
    name: 'home',
    component: require('./components/records/RecordsPage.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: require('./components/NotFoundPage.vue')
  }
];
