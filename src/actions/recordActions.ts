import dataService from '../services/dataService';
import helper from './actionHelper';
import {LOAD_RECORDS, DELETE_RECORD} from '../action_types/recordActionTypes';

const loadRecordsSuccess = (records: any, sortBy: string) => helper.getAction(LOAD_RECORDS, {records, sortBy});

const deleteRecordSuccess = (id: number) => helper.getAction(DELETE_RECORD, {id});

export const loadRecords = (sortBy: string) => {
  return helper.dispatchAsyncAction(
    async (dispatch: any) => {
      let records = await dataService.getRecords(sortBy);
      dispatch(loadRecordsSuccess(records, sortBy));
    },
    {showOverlay: false}
  );
};

export const saveRecord = (record: any) => {
  return helper.dispatchAsyncAction(async () => {
    await dataService.saveRecord(record);
    return true;
  }, null);
};

export const deleteRecord = (id: number) => {
  return helper.dispatchAsyncAction(async (dispatch: any) => {
    await dataService.deleteRecord(id);
    dispatch(deleteRecordSuccess(id));
    return true;
  }, null);
};
