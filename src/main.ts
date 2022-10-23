import {createApp} from 'vue';
import {createPinia} from 'pinia';
import ElementPlus from 'element-plus';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {defineRule} from 'vee-validate';
import {required, email, confirmed, min_value} from '@vee-validate/rules';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

import './assets/main.css';

/* add icons to the library */
library.add(faPlus);

//define global rules for vee-validate
defineRule('required', required);
defineRule('email', email);
defineRule('confirmed', confirmed);
defineRule('min_value', min_value);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
