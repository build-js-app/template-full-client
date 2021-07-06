import dataService from 'services/dataService';
import helper from './actionHelper';
import {LOAD_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from 'action_types/categoryActionTypes';

export default {
  loadCategories,
  saveCategory,
  deleteCategory
};

function loadCategories() {
  return helper.dispatchAsyncAction(async dispatch => {
    const categories = await dataService.getCategories();
    dispatch(helper.getAction(LOAD_CATEGORIES, {categories}));
  }, false);
}

function saveCategory(category) {
  return helper.dispatchAsyncAction(async dispatch => {
    const categoryResponse = await dataService.saveCategory(category);

    if (category.id) {
      dispatch(helper.getAction(UPDATE_CATEGORY, {category: categoryResponse}));
    } else {
      dispatch(helper.getAction(CREATE_CATEGORY, {category: categoryResponse}));
    }

    return categoryResponse;
  });
}

function deleteCategory(id: number) {
  return helper.dispatchAsyncAction(async dispatch => {
    await dataService.deleteCategory(id);
    dispatch(helper.getAction(DELETE_CATEGORY, {id}));
    return true;
  });
}
