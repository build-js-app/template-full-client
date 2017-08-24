import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function categoryReducer(state = initialState.category, action) {
    switch (action.type) {
        case types.LOAD_CATEGORIES_SUCCESS:
            return _.assign({}, state, {list: action.categories});

        case types.CREATE_CATEGORY_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list,
                _.assign({}, action.category)
            ]});

        case types.UPDATE_CATEGORY_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(category => category.id !== action.category.id),
                _.assign({}, action.category)
            ]});

        case types.DELETE_CATEGORY_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(category => category.id !== action.id)
            ]});

        default:
            return state;
    }
}