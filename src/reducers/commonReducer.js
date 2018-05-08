import * as types from 'action_types/commonActionTypes';
import initialState from './initialState';

const commonReducer = (state = initialState.common, action) => {
  switch (action.type) {
    case types.ASYNC_ACTION_START:
      return {
        ...state,
        asyncActionInProgress: true
      };

    case types.ASYNC_ACTION_END:
      return {
        ...state,
        asyncActionInProgress: false
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
