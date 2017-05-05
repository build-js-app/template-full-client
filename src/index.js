import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

import App from './components/App.vue';
import store from './store';
import {routes} from './routes';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'toastr/build/toastr.min.css';
import 'flatpickr/dist/flatpickr.min.css';

// install router
Vue.use(VueRouter);
Vue.use(VeeValidate);

export const router = new VueRouter({
  mode: 'history',
  routes
});

// bootstrap the app
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
