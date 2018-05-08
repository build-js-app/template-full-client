import {asyncActionStart, asyncActionEnd} from './commonActions';

export default {
  dispatchAsyncAction,
  getAction
};

function dispatchAsyncAction(action) {
  return async (dispatch, getState) => {
    try {
      dispatch(asyncActionStart());

      let result = await action(dispatch, getState);

      dispatch(asyncActionEnd());

      if (!result) return null;

      return result;
    } catch (error) {
      dispatch(asyncActionEnd());
      throw error;
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
