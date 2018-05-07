import * as types from 'action_types/commonActionTypes';
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

    case types.CONFIRM_ACTION:
      return {
        ...state,
        confirmAction: action.payload
      };

    case types.CONFIRM_ACTION_CANCEL:
      return {
        ...state,
        confirmAction: null
      };

    default:
      return state;
  }
};

export default commonReducer;
