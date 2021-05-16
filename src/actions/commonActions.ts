import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  CONFIRM_ACTION,
  CONFIRM_ACTION_CANCEL
} from 'action_types/commonActionTypes';

import helper from './actionHelper';

export default {
  asyncActionStart,
  asyncActionEnd,
  confirmAction,
  confirmActionCancel
};

function asyncActionStart(showOverlay: boolean) {
  return helper.getAction(ASYNC_ACTION_START, {showOverlay});
}

function asyncActionEnd() {
  return helper.getAction(ASYNC_ACTION_END, {});
}

function confirmAction(confirmInfo) {
  return helper.getAction(CONFIRM_ACTION, confirmInfo);
}

function confirmActionCancel() {
  return helper.getAction(CONFIRM_ACTION_CANCEL, {});
}
