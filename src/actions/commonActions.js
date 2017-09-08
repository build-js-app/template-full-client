import {BEGIN_AJAX_CALL, END_AJAX_CALL} from '../actionTypes/commonActionTypes';

export const beginAjaxCall = () => ({
  type: BEGIN_AJAX_CALL
});

export const endAjaxCall = () => ({
  type: END_AJAX_CALL
});
