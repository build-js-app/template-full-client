import * as _ from 'lodash';

import dataService from '../../services/dataService';
import * as types from '../mutationTypes';

const state = {
  list: []
};

const getters = {
  categories: state => state.list
};

// actions
const actions = {
  async loadCategories ({ commit }) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let categories = await dataService.getCategories();

      commit(types.LOAD_CATEGORIES, categories);

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async saveCategory ({commit}, category) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let data = await dataService.saveCategory(category);

      if (category._id) {
        commit(types.EDIT_CATEGORY, data);
      } else {
        commit(types.ADD_CATEGORY, data);
      }

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async deleteCategory({commit}, id) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      await dataService.deleteCategory(id);

      commit(types.DELETE_CATEGORY, id);

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  }
};

const mutations = {
  [types.LOAD_CATEGORIES] (state, categories) {
    state.list = categories;
  },

  [types.ADD_CATEGORY] (state, category) {
    state.list.push(category);
  },

  [types.EDIT_CATEGORY] (state, category) {
    state.list.map(cat => {
      return cat._id === category._id ? Object.assign(cat, category) : cat;
    });
  },

  [types.DELETE_CATEGORY] (state, id) {
    state.list = _.filter(state.list, (category) => {
      return category._id !== id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
