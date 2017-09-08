import * as types from '../actionTypes/commonActionTypes';
import initialState from './initialState';

const commonReducer = (state = initialState.common, action) => {
  switch (action.type) {
    case types.BEGIN_AJAX_CALL:
      return {
        ...state,
        ajaxCallsInProgress: true
      };

    case types.END_AJAX_CALL:
      return {
        ...state,
        ajaxCallsInProgress: false
      };

    default:
      return state;
  }
};

export default commonReducer;
