import helper from './reducerHelper';

import {LOAD_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from '../action_types/categoryActionTypes';
import initialState from './initialState';

const categoryReducer = (state = initialState.category, action: any) => {
  return helper.handleActions(state, action, {
    [LOAD_CATEGORIES](state: any, payload: any) {
      state.list = payload.categories;
    },
    [CREATE_CATEGORY](state: any, payload: any) {
      let newList = [...state.list, {...payload.category}];
      state.list = newList;
    },
    [UPDATE_CATEGORY](state: any, payload: any) {
      let newList = [
        ...state.list.filter((category: any) => category.id !== payload.category.id),
        {...payload.category}
      ];
      state.list = newList;
    },
    [DELETE_CATEGORY](state: any, payload: any) {
      let newList = [...state.list.filter((category: any) => category.id !== payload.id)];
      state.list = newList;
    }
  });
};

export default categoryReducer;
