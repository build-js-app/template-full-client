import commonActions from './commonActions';

export default {
  dispatchAsyncAction,
  getAction
};

const throwError = false;

//performes async action
//action is function which has (dispatch, getState) arguments like redux thunk
function dispatchAsyncAction(action, showOverlay = true) {
  return async (dispatch, getState) => {
    try {
      if (!showOverlay) dispatch(commonActions.asyncActionStart(showOverlay));

      const result = await action(dispatch, getState);

      if (!showOverlay) dispatch(commonActions.asyncActionEnd());

      if (!result) return null;

      return result;
    } catch (error) {
      if (!showOverlay) dispatch(commonActions.asyncActionEnd());
      if (throwError) throw error;
    }
  };
}

function getAction(type: string, payload: object = {}) {
  if (!type) throw new Error('Specify action type');

  return {
    type,
    payload
  };
}
