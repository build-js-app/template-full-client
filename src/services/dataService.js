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

function getRecords(sortBy) {
  let data = {
    sortBy
  };

  return httpHelper.get('/api/records', data);
}

function deleteRecord(id) {
  return httpHelper.delete(`/api/record/${id}`);
}

function saveRecord(record) {
  let data = {
    record
  };

  return httpHelper.post('/api/record', data);
}
