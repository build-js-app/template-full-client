import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function recordReducer(state = initialState.record, action) {
    switch (action.type) {
        case types.LOAD_RECORDS_SUCCESS:
            return _.assign({}, state, {list: action.records});

        case types.CREATE_RECORD_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list,
                _.assign({}, action.record)
            ]});

        case types.UPDATE_RECORD_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(record => record._id !== action.record._id),
                _.assign({}, action.record)
            ]});

        case types.DELETE_RECORD_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(record => record._id !== action.id)
            ]});

        default:
            return state;
    }
}