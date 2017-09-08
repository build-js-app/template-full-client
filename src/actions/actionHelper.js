import {beginAjaxCall, endAjaxCall} from './commonActions';

export default {
  dispatchAjaxAction
};

function dispatchAjaxAction(action) {
  return async dispatch => {
    try {
      dispatch(beginAjaxCall());

      let result = await action(dispatch);

      dispatch(endAjaxCall());

      if (!result) return {};

      return result;
    } catch (error) {
      dispatch(endAjaxCall());
      throw error;
    }
  };
}
