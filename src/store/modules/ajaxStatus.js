import {BEGIN_AJAX_CALL, END_AJAX_CALL} from '../mutationTypes';

const state = {
  isAjaxLoad: false
};

const getters = {
  isAjaxLoad: state => state.isAjaxLoad
};

const mutations = {
  [BEGIN_AJAX_CALL](state) {
    state.isAjaxLoad = true;
  },

  [END_AJAX_CALL](state) {
    state.isAjaxLoad = false;
  }
};

export default {
  state,
  getters,
  mutations
};
