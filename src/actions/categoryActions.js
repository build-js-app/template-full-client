import * as types from './actionTypes';
import dataService from '../services/dataService';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function loadCategoriesSuccess(categories) {
    return {type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function createCategorySuccess(category) {
    return {type: types.CREATE_CATEGORY_SUCCESS, category};
}

export function updateCategorySuccess(category) {
    return {type: types.UPDATE_CATEGORY_SUCCESS, category};
}

export function deleteCategorySuccess(id) {
    return {type: types.DELETE_CATEGORY_SUCCESS, id};
}

export function loadCategories() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return dataService.getCategories()
            .then(categories => {
                dispatch(loadCategoriesSuccess(categories));

                dispatch(endAjaxCall());
            }).catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    };
}

export function saveCategory(category) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return dataService.saveCategory(category)
            .then((data) => {
                if (category._id) {
                    dispatch(updateCategorySuccess(data));
                } else {
                    dispatch(createCategorySuccess(data));
                }

                dispatch(endAjaxCall());
            }).catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    };
}

export function deleteCategory(id) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return dataService.deleteCategory(id)
            .then(() => {
                dispatch(deleteCategorySuccess(id));

                dispatch(endAjaxCall());
            }).catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    };
}