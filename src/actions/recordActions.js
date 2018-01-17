import dataService from '../services/dataService';
import helper from './actionHelper';
import {LOAD_RECORDS_SUCCESS, DELETE_RECORD_SUCCESS} from '../actionTypes/recordActionTypes.js';

export const loadRecordsSuccess = records => ({
  type: LOAD_RECORDS_SUCCESS,
  payload: {records}
});

export const deleteRecordSuccess = id => ({
  type: DELETE_RECORD_SUCCESS,
  payload: {id}
});

export const loadRecords = sortBy => {
  return helper.dispatchAjaxAction(async dispatch => {
    let records = await dataService.getRecords(sortBy);
    dispatch(loadRecordsSuccess(records));
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
