import {BEGIN_AJAX_CALL, END_AJAX_CALL, CONFIRM_ACTION, CONFIRM_ACTION_CANCEL} from 'action_types/commonActionTypes';

export const beginAjaxCall = () => ({
  type: BEGIN_AJAX_CALL
});

export const endAjaxCall = () => ({
  type: END_AJAX_CALL
});

export const confirmAction = confirmInfo => ({
  type: CONFIRM_ACTION,
  payload: confirmInfo
});

export const confirmActionCancel = () => ({
  type: CONFIRM_ACTION_CANCEL
});
