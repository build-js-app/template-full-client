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
  return httpHelper.get(`/api/current-user`, {});
}

function getCategories() {
  return httpHelper.get('/api/categories', {});
}

function deleteCategory(id: string) {
  return httpHelper.delete(`/api/category/${id}`);
}

function saveCategory(category: Category) {
  const data = {
    category
  };

  return httpHelper.post('/api/category', data);
}

async function getRecords(sortBy: string) {
  const data = {
    sortBy
  };

  const records = await httpHelper.get('/api/records', data);

  return records;
}

function deleteRecord(id: string) {
  return httpHelper.delete(`/api/record/${id}`);
}

async function saveRecord(record: RecordItem) {
  const data = {
    record
  };

  return await httpHelper.post('/api/record', data);
}
