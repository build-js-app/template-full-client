import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import records from './modules/records';
import categories from './modules/categories';
import user from './modules/user';
import ajaxStatus from './modules/ajaxStatus';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  modules: {
    records,
    categories,
    user,
    ajaxStatus
  },
  strict: debug
});
