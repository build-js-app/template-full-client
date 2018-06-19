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
  return helper.dispatchAsyncAction(
    async dispatch => {
      let categories = await dataService.getCategories();
      dispatch(loadCategoriesSuccess(categories));
    },
    {showOverlay: false}
  );
};

export const saveCategory = category => {
  return helper.dispatchAsyncAction(async dispatch => {
    let categoryResponse = await dataService.saveCategory(category);

    if (category.id) {
      dispatch(updateCategorySuccess(categoryResponse));
    } else {
      dispatch(createCategorySuccess(categoryResponse));
    }

    return categoryResponse;
  });
};

export const deleteCategory = id => {
  return helper.dispatchAsyncAction(async dispatch => {
    await dataService.deleteCategory(id);
    dispatch(deleteCategorySuccess(id));
    return true;
  });
};
