import helper from './actionHelper';
import uiHelper from 'helpers/uiHelper';

import dataService from 'services/dataService';
import authService from 'services/authService';

import {LOAD_CURRENT_USER} from 'action_types/userActionTypes';

export const loadCurrentUserSuccess = user => helper.getAction(LOAD_CURRENT_USER, {user});

export const getCurrentUser = () => {
  return helper.dispatchAsyncAction(async dispatch => {
    let user = await dataService.getCurrentUser();
    dispatch(loadCurrentUserSuccess(user));
  });
};

export const loginUser = user => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await authService.login(user);

    if (response && response.token) {
      authService.saveToken(response.token);
    }
  });
};

export const logOut = () => {
  return helper.dispatchAsyncAction(async dispatch => {
    dispatch(loadCurrentUserSuccess(null));
    authService.saveToken(null);
  });
};

export const forgotPassword = email => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await authService.passwordForgot(email);

    if (response && response.message) uiHelper.showMessage(response.message);
  });
};

export const resetPassword = userData => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await authService.resetPassword(userData);
    return response;
  });
};

export const activateUserAccount = token => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await authService.activateAccount(token);
    return response;
  });
};

export const signUp = user => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await authService.signUp(user);
    return response;
  });
};

export const checkResetToken = token => {
  return helper.dispatchAsyncAction(async dispatch => {
    let response = await authService.resetPasswordTokenCheck(token);
    return response;
  });
};
