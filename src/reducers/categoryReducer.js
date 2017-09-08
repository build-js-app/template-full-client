import * as types from '../actionTypes/categoryActionTypes';
import initialState from './initialState';
import _ from 'lodash';

const categoryReducer = (state = initialState.category, action) => {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        list: action.payload.categories
      };

    case types.CREATE_CATEGORY_SUCCESS:
      return _.assign({}, state, {
        list: [...state.list, _.assign({}, action.payload.category)]
      });

    case types.UPDATE_CATEGORY_SUCCESS:
      return _.assign({}, state, {
        list: [
          ...state.list.filter(category => category.id !== action.payload.category.id),
          _.assign({}, action.payload.category)
        ]
      });

    case types.DELETE_CATEGORY_SUCCESS:
      return _.assign({}, state, {
        list: [...state.list.filter(category => category.id !== action.payload.id)]
      });

    default:
      return state;
  }
};

export default categoryReducer;
