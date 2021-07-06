import helper from './reducerHelper';

import {LOAD_RECORDS, DELETE_RECORD} from 'action_types/recordActionTypes';
import initialState from './initialState';

export interface RecordState {
  list: RecordItem[];
  sortBy: string;
}

const recordReducer = (state: RecordState = initialState.record, action) => {
  return helper.handleActions(state, action, {
    [LOAD_RECORDS](state, payload) {
      state.list = payload.records;
      state.sortBy = payload.sortBy;
    },
    [DELETE_RECORD]: deleteRecord
  });
};

function deleteRecord(state, payload) {
  const newList = [...state.list.filter(record => record.id !== payload.id)];
  state.list = newList;
}

export default recordReducer;
