import dataService from 'services/dataService';
import helper from './actionHelper';
import {LOAD_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from 'action_types/categoryActionTypes';

const loadCategoriesSuccess = categories => helper.getAction(LOAD_CATEGORIES, {categories});

const createCategorySuccess = category => helper.getAction(CREATE_CATEGORY, {category});

export const updateCategorySuccess = category => ({
  type: UPDATE_CATEGORY,
  payload: {category}
});

export const deleteCategorySuccess = id => ({
  type: DELETE_CATEGORY,
  payload: {id}
});

export const loadCategories = () => {
  return helper.dispatchAsyncAction(async dispatch => {
    let categories = await dataService.getCategories();
    dispatch(loadCategoriesSuccess(categories));
  });
};

export const saveCategory = category => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await dataService.saveCategory(category);

    if (category.id) {
      dispatch(updateCategorySuccess(response));
    } else {
      dispatch(createCategorySuccess(response));
    }
  });
};

export const deleteCategory = id => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await dataService.deleteCategory(id);

    if (response) {
      dispatch(deleteCategorySuccess(id));
      return id;
    }
  });
};
