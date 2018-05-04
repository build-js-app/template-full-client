import * as types from '../actionTypes/recordActionTypes';
import initialState from './initialState';
import _ from 'lodash';

const recordReducer = (state = initialState.record, action) => {
  switch (action.type) {
    case types.LOAD_RECORDS_SUCCESS:
      return {
        ...state,
        list: action.payload.records,
        sortBy: action.payload.sortBy
      };

    case types.DELETE_RECORD_SUCCESS:
      return _.assign({}, state, {
        list: [...state.list.filter(record => record.id !== action.payload.id)]
      });

    default:
      return state;
  }
};

export default recordReducer;
