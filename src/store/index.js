import Vue from 'vue';
import Vuex from 'vuex';
import records from './modules/records';
import categories from './modules/categories';
import user from './modules/user';
import ajaxStatus from './modules/ajaxStatus';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    records,
    categories,
    user,
    ajaxStatus
  },
  strict: debug
});
