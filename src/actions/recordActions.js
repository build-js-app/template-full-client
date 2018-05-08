import dataService from 'services/dataService';
import helper from './actionHelper';
import {LOAD_RECORDS_SUCCESS, DELETE_RECORD_SUCCESS} from 'action_types/recordActionTypes.js';

const loadRecordsSuccess = (records, sortBy) => helper.getAction(LOAD_RECORDS_SUCCESS, {records, sortBy});

const deleteRecordSuccess = id => helper.getAction(DELETE_RECORD_SUCCESS, {id});

export const loadRecords = sortBy => {
  return helper.dispatchAsyncAction(async dispatch => {
    let records = await dataService.getRecords(sortBy);
    dispatch(loadRecordsSuccess(records, sortBy));
  });
};

export const saveRecord = record => {
  return helper.dispatchAsyncAction(async dispatch => {
    await dataService.saveRecord(record);
  });
};

export const deleteRecord = id => {
  return helper.dispatchAsyncAction(async dispatch => {
    await dataService.deleteRecord(id);
    dispatch(deleteRecordSuccess(id));
  });
};
