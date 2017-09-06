import * as _ from 'lodash';
import dataService from '../../services/dataService';

import * as types from '../mutationTypes';

const state = {
  list: [],
  sortBy: 'date'
};

const getters = {
  records: state => state.list,
  sortBy: state => state.sortBy
};

// actions
const actions = {
  async loadRecords ({ commit }) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let records = await dataService.getRecords(state.sortBy);

      commit(types.LOAD_RECORDS, { records });

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  changeSortOrder ({ dispatch, commit }, sortOrder) {
    commit(types.CHANGE_SORT_ORDER, sortOrder);

    dispatch('loadRecords');
  },

  async saveRecord ({commit}, record) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      let data = await dataService.saveRecord(record);

      if (record.id) {
        commit(types.EDIT_RECORD, data);
      } else {
        commit(types.ADD_RECORD, data);
      }

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  },

  async deleteRecord({commit}, id) {
    try {
      commit(types.BEGIN_AJAX_CALL);

      await dataService.deleteRecord(id);

      commit(types.DELETE_RECORD, id);

      commit(types.END_AJAX_CALL);
    } catch (err) {
      commit(types.END_AJAX_CALL);
    }
  }
};

const mutations = {
  [types.LOAD_RECORDS] (state, { records }) {
    state.list = records;
  },

  [types.CHANGE_SORT_ORDER] (state, sortOrder) {
    state.sortBy = sortOrder;
  },

  [types.ADD_RECORD] (state, record) {
    state.list.push(record);
  },

  [types.EDIT_RECORD] (state, record) {
    state.list.map(rec => {
      return rec.id === record.id ? Object.assign(rec, record) : rec;
    });
  },

  [types.DELETE_RECORD] (state, id) {
    state.list = _.filter(state.list, (record) => {
      return record.id !== id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
