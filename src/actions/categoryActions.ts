import dataService from '../services/dataService';
import helper from './actionHelper';
import {LOAD_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from '../action_types/categoryActionTypes';

const loadCategoriesSuccess = (categories: Array<any>) => helper.getAction(LOAD_CATEGORIES, {categories});

const createCategorySuccess = (category: object) => helper.getAction(CREATE_CATEGORY, {category});

export const updateCategorySuccess = (category: object) => ({type: UPDATE_CATEGORY, payload: {category}});

export const deleteCategorySuccess = (id: number) => ({type: DELETE_CATEGORY, payload: {id}});

export const loadCategories = () => {
  return helper.dispatchAsyncAction(
    async (dispatch: any) => {
      let categories = await dataService.getCategories();
      dispatch(loadCategoriesSuccess(categories));
    },
    {showOverlay: false}
  );
};

export const saveCategory = (category: any) => {
  return helper.dispatchAsyncAction(async (dispatch: any) => {
    let categoryResponse = await dataService.saveCategory(category);

    if (category.id) {
      dispatch(updateCategorySuccess(categoryResponse));
    } else {
      dispatch(createCategorySuccess(categoryResponse));
    }

    return categoryResponse;
  }, null);
};

export const deleteCategory = (id: number) => {
  return helper.dispatchAsyncAction(async (dispatch: any) => {
    await dataService.deleteCategory(id);
    dispatch(deleteCategorySuccess(id));
    return true;
  }, null);
};
