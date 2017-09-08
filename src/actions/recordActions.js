import dataService from '../services/dataService';
import helper from './actionHelper';
import {
  LOAD_RECORDS_SUCCESS,
  CREATE_RECORD_SUCCESS,
  UPDATE_RECORD_SUCCESS,
  DELETE_RECORD_SUCCESS
} from '../actionTypes/recordActionTypes.js';

export const loadRecordsSuccess = records => ({
  type: LOAD_RECORDS_SUCCESS,
  payload: {records}
});

export const createRecordSuccess = record => ({
  type: CREATE_RECORD_SUCCESS,
  payload: {record}
});

export const updateRecordSuccess = record => ({
  type: UPDATE_RECORD_SUCCESS,
  payload: {record}
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
    let response = await dataService.saveRecord(record);

    if (record.id) {
      dispatch(updateRecordSuccess(response));
    } else {
      dispatch(createRecordSuccess(response));
    }
  });
};

export const deleteRecord = id => {
  return helper.dispatchAjaxAction(async dispatch => {
    await dataService.deleteRecord(id);
    dispatch(deleteRecordSuccess(id));
  });
};
