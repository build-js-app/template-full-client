import dataService from 'services/dataService';
import helper from './actionHelper';
import {LOAD_RECORDS_SUCCESS, DELETE_RECORD_SUCCESS} from 'action_types/recordActionTypes.js';

export const loadRecordsSuccess = (records, sortBy) => ({
  type: LOAD_RECORDS_SUCCESS,
  payload: {records, sortBy}
});

export const deleteRecordSuccess = id => ({
  type: DELETE_RECORD_SUCCESS,
  payload: {id}
});

export const loadRecords = sortBy => {
  return helper.dispatchAjaxAction(async dispatch => {
    let records = await dataService.getRecords(sortBy);
    dispatch(loadRecordsSuccess(records, sortBy));
  });
};

export const saveRecord = record => {
  return helper.dispatchAjaxAction(async dispatch => {
    await dataService.saveRecord(record);
  });
};

export const deleteRecord = id => {
  return helper.dispatchAjaxAction(async dispatch => {
    await dataService.deleteRecord(id);
    dispatch(deleteRecordSuccess(id));
  });
};
