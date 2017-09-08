import dateFns from 'date-fns';

import httpHelper from '../helpers/httpHelper';

export default {
  getCurrentUser,
  getCategories,
  deleteCategory,
  saveCategory,
  getRecords,
  deleteRecord,
  saveRecord
};

function getCurrentUser() {
  return httpHelper.get(`/api/current-user`);
}

function getCategories() {
  return httpHelper.get('/api/categories');
}

function deleteCategory(id) {
  return httpHelper.delete(`/api/category/${id}`);
}

function saveCategory(category) {
  let data = {
    category
  };

  return httpHelper.post('/api/category', data);
}

async function getRecords(sortBy) {
  let data = {
    sortBy
  };

  let records = await httpHelper.get('/api/records', data);

  for (let record of records) {
    formatRecord(record);
  }

  return records;
}

function deleteRecord(id) {
  return httpHelper.delete(`/api/record/${id}`);
}

async function saveRecord(record) {
  let data = {
    record
  };

  let recordData = await httpHelper.post('/api/record', data);

  return formatRecord(recordData);
}

function formatRecord(record) {
  record.date = dateFns.parse(record.date);

  return record;
}
