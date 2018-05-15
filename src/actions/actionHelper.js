import {asyncActionStart, asyncActionEnd} from './commonActions';

export default {
  dispatchAction,
  dispatchAsyncAction,
  getAction
};

//performes async action
//action is function which has (dispatch, getState) arguments like redux thunk
function dispatchAsyncAction(action, throwError = false) {
  return async (dispatch, getState) => {
    try {
      dispatch(asyncActionStart());

      let result = await action(dispatch, getState);

      dispatch(asyncActionEnd());

      if (!result) return null;

      return result;
    } catch (error) {
      dispatch(asyncActionEnd());
      if (throwError) throw error;
    }
  };
}

//performes sync action
function dispatchAction(action, throwError = false) {
  return async (dispatch, getState) => {
    try {
      let result = await action(dispatch, getState);

      if (!result) return null;

      return result;
    } catch (error) {
      if (throwError) throw error;
    }
  };
}

function getAction(type, payload) {
  if (!type) throw new Error('Specify action type');

  return {
    type,
    payload
  };
}
