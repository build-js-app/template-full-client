import * as types from './actionTypes';
import dataService from '../services/dataService';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function loadRecordsSuccess(records) {
  return {type: types.LOAD_RECORDS_SUCCESS, records};
}

export function createRecordSuccess(record) {
  return {type: types.CREATE_RECORD_SUCCESS, record};
}

export function updateRecordSuccess(record) {
  return {type: types.UPDATE_RECORD_SUCCESS, record};
}

export function deleteRecordSuccess(id) {
  return {type: types.DELETE_RECORD_SUCCESS, id};
}

export function loadRecords(sortBy) {
  return dispatch => {
    dispatch(beginAjaxCall());

    return dataService
      .getRecords(sortBy)
      .then(records => {
        dispatch(loadRecordsSuccess(records));

        dispatch(endAjaxCall());
      })
      .catch(error => {
        dispatch(endAjaxCall());

        throw error;
      });
  };
}

export function saveRecord(record) {
  return dispatch => {
    dispatch(beginAjaxCall());

    return dataService
      .saveRecord(record)
      .then(data => {
        if (record.id) {
          dispatch(updateRecordSuccess(data));
        } else {
          dispatch(createRecordSuccess(data));
        }

        dispatch(endAjaxCall());
      })
      .catch(error => {
        dispatch(endAjaxCall());

        throw error;
      });
  };
}

export function deleteRecord(id) {
  return dispatch => {
    dispatch(beginAjaxCall());

    return dataService
      .deleteRecord(id)
      .then(() => {
        dispatch(deleteRecordSuccess(id));

        dispatch(endAjaxCall());
      })
      .catch(error => {
        dispatch(endAjaxCall());

        throw error;
      });
  };
}
