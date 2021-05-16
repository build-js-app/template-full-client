import helper from './reducerHelper';

import {LOAD_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from 'action_types/categoryActionTypes';
import initialState from './initialState';

export interface CategoryState {
  current?: Category;
  list: Category[];
}

const categoryReducer = (state: CategoryState = initialState.category, action) => {
  return helper.handleActions(state, action, {
    [LOAD_CATEGORIES](state, payload) {
      state.list = payload.categories;
    },
    [CREATE_CATEGORY](state, payload) {
      let newList = [...state.list, {...payload.category}];
      state.list = newList;
    },
    [UPDATE_CATEGORY](state, payload) {
      let newList = [...state.list.filter(category => category.id !== payload.category.id), {...payload.category}];
      state.list = newList;
    },
    [DELETE_CATEGORY](state, payload) {
      let newList = [...state.list.filter(category => category.id !== payload.id)];
      state.list = newList;
    }
  });
};

export default categoryReducer;
