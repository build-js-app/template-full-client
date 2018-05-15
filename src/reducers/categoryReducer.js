import helper from './reducerHelper';

import {
  LOAD_CATEGORIES_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from 'action_types/categoryActionTypes';
import initialState from './initialState';

const categoryReducer = (state = initialState.category, action) => {
  return helper.handleActions(state, action, {
    [LOAD_CATEGORIES_SUCCESS](state, payload) {
      state.list = payload.categories;
    },
    [CREATE_CATEGORY_SUCCESS](state, payload) {
      let newList = [...state.list, {...payload.category}];
      state.list = newList;
    },
    [UPDATE_CATEGORY_SUCCESS](state, payload) {
      let newList = [...state.list.filter(category => category.id !== payload.category.id), {...payload.category}];
      state.list = newList;
    },
    [DELETE_CATEGORY_SUCCESS](state, payload) {
      let newList = [...state.list.filter(category => category.id !== payload.id)];
      state.list = newList;
    }
  });
};

export default categoryReducer;
