import toastr from 'toastr';

import dataService from '../../services/dataService';
import authService from '../../services/authService';
import * as types from '../mutationTypes';

const state = {
  user: null
};

const getters = {
  user: state => state.user
};

// actions
const actions = {
  async getCurrentUser({commit}) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let user = await dataService.getCurrentUser();

      commit(types.LOAD_CURRENT_USER, {user});

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async login({commit}, userData) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let response = await authService.login(userData);

      if (response && response.user) {
        commit(types.LOAD_CURRENT_USER, {user: response.user});

        authService.saveToken(response.token);
      }

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async logout({commit}) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      authService.redirectToLogin();

      authService.saveToken(null);

      commit(types.LOAD_CURRENT_USER, {undefined});

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async signup({commit}, userData) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let data = await authService.signUp(userData);

      if (data && data.message) {
        authService.redirectToLogin();

        toastr.success(data.message);
      }

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async activateUserAccount({commit}, token) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let data = await authService.activateAccount(token);

      commit(types.END_AJAX_CALL);

      return data;
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async forgotPassword({commit}, email) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let data = await authService.passwordForgot(email);

      if (data && data.message) toastr.success(data.message);

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async checkResetToken({commit}, token) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let data = await authService.resetPasswordTokenCheck(token);

      commit(types.END_AJAX_CALL);

      return data;
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async resetPassword({commit}, userData) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let data = await authService.resetPassword(userData);

      if (data && data.message) {
        authService.redirectToLogin();

        toastr.success(data.message);
      }

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  }
};

const mutations = {
  [types.LOAD_CURRENT_USER](state, {user}) {
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
