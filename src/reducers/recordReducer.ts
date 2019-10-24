import helper from './reducerHelper';

import {LOAD_RECORDS, DELETE_RECORD} from '../action_types/recordActionTypes';
import initialState from './initialState';

const recordReducer = (state = initialState.record, action: any) => {
  return helper.handleActions(state, action, {
    [LOAD_RECORDS](state: any, payload: any) {
      state.list = payload.records;
      state.sortBy = payload.sortBy;
    },
    [DELETE_RECORD]: deleteRecord
  });
};

function deleteRecord(state: any, payload: any) {
  let newList = [...state.list.filter((record: any) => record.id !== payload.id)];
  state.list = newList;
}

export default recordReducer;
