import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  CONFIRM_ACTION,
  CONFIRM_ACTION_CANCEL
} from '../action_types/commonActionTypes';

import helper from './actionHelper';

export const asyncActionStart = (showOverlay: boolean) => helper.getAction(ASYNC_ACTION_START, {showOverlay});

export const asyncActionEnd = () => helper.getAction(ASYNC_ACTION_END, {});

export const confirmAction = (confirmInfo: any) => helper.getAction(CONFIRM_ACTION, confirmInfo);

export const confirmActionCancel = () => helper.getAction(CONFIRM_ACTION_CANCEL, {});
