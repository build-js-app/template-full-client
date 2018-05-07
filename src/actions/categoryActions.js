import dataService from 'services/dataService';
import helper from './actionHelper';
import {
  LOAD_CATEGORIES_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from 'action_types/categoryActionTypes';

export const loadCategoriesSuccess = categories => ({
  type: LOAD_CATEGORIES_SUCCESS,
  payload: {categories}
});

export const createCategorySuccess = category => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload: {category}
});

export const updateCategorySuccess = category => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: {category}
});

export const deleteCategorySuccess = id => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: {id}
});

export const loadCategories = () => {
  return helper.dispatchAjaxAction(async dispatch => {
    let categories = await dataService.getCategories();
    dispatch(loadCategoriesSuccess(categories));
  });
};

export const saveCategory = category => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await dataService.saveCategory(category);

    if (category.id) {
      dispatch(updateCategorySuccess(response));
    } else {
      dispatch(createCategorySuccess(response));
    }
  });
};

export const deleteCategory = id => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await dataService.deleteCategory(id);

    if (response) {
      dispatch(deleteCategorySuccess(id));
      return id;
    }
  });
};
