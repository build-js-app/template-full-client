import dataService from 'services/dataService';
import helper from './actionHelper';
import {LOAD_RECORDS, DELETE_RECORD} from 'action_types/recordActionTypes';

export default {
  loadRecords,
  saveRecord,
  deleteRecord
};

function loadRecords(sortBy: string) {
  return helper.dispatchAsyncAction(async dispatch => {
    const records = await dataService.getRecords(sortBy);
    const action = helper.getAction(LOAD_RECORDS, {records, sortBy});
    dispatch(action);
  }, false);
}

function saveRecord(record) {
  return helper.dispatchAsyncAction(async () => {
    await dataService.saveRecord(record);
    return true;
  });
}

function deleteRecord(id: number) {
  return helper.dispatchAsyncAction(async dispatch => {
    await dataService.deleteRecord(id);
    const action = helper.getAction(DELETE_RECORD, {id});
    dispatch(action);
    return true;
  });
}
