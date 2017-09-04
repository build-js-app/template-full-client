import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ajaxStatusReducer(state = initialState.isAjaxLoad, action) {
  switch (action.type) {
    case types.BEGIN_AJAX_CALL:
      return true;

    case types.END_AJAX_CALL:
      return false;

    default:
      return state;
  }
}
