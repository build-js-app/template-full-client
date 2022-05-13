import {asyncActionStart, asyncActionEnd} from 'reducers/commonSlice';
import {AppDispatch} from 'store';

export default {
  dispatchAsyncAction
};

const throwError = false;

//performes async action
//action is function which has (dispatch, getState) arguments like redux thunk
function dispatchAsyncAction(action, showOverlay = true) {
  return async (dispatch: AppDispatch, getState) => {
    try {
      if (showOverlay) dispatch(asyncActionStart(showOverlay));

      const result = await action(dispatch, getState);

      if (showOverlay) dispatch(asyncActionEnd());

      if (!result) return null;

      return result;
    } catch (error) {
      if (!showOverlay) dispatch(asyncActionEnd());
      if (throwError) throw error;
    }
  };
}
