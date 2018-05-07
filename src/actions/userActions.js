import toastr from 'toastr';

import dataService from 'services/dataService';
import authService from 'services/authService';
import helper from './actionHelper';
import {LOAD_CURRENT_USER_SUCCESS} from 'action_types/userActionTypes';

export const loadCurrentUserSuccess = user => ({
  type: LOAD_CURRENT_USER_SUCCESS,
  payload: {user}
});

export const getCurrentUser = () => {
  return helper.dispatchAjaxAction(async dispatch => {
    let user = await dataService.getCurrentUser();
    dispatch(loadCurrentUserSuccess(user));
  });
};

export const loginUser = user => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await authService.login(user);

    if (response && response.token) {
      authService.saveToken(response.token);
    }
  });
};

export const logOut = () => {
  return helper.dispatchAjaxAction(async dispatch => {
    dispatch(loadCurrentUserSuccess(null));
    authService.saveToken(null);
  });
};

export const forgotPassword = email => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await authService.passwordForgot(email);

    if (response && response.message) toastr.success(response.message);
  });
};

export const resetPassword = userData => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await authService.resetPassword(userData);
    return response;
  });
};

export const activateUserAccount = token => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await authService.activateAccount(token);
    return response;
  });
};

export const signUp = user => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await authService.signUp(user);
    return response;
  });
};

export const checkResetToken = token => {
  return helper.dispatchAjaxAction(async dispatch => {
    let response = await authService.resetPasswordTokenCheck(token);
    return response;
  });
};
