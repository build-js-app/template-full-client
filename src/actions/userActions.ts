import helper from './actionHelper';
import uiHelper from '../helpers/uiHelper';

import dataService from '../services/dataService';
import authService from '../services/authService';

import {LOAD_CURRENT_USER} from '../action_types/userActionTypes';

export const loadCurrentUserSuccess = (user: any) => helper.getAction(LOAD_CURRENT_USER, {user});

export const getCurrentUser = () => {
  return helper.dispatchAsyncAction(async (dispatch: any) => {
    let user = await dataService.getCurrentUser();
    dispatch(loadCurrentUserSuccess(user));
  }, null);
};

export const loginUser = (user: any) => {
  return helper.dispatchAsyncAction(async () => {
    let response = await authService.login(user);

    if (response && response.token) {
      authService.saveToken(response.token);
    }
  }, null);
};

export const logOut = () => {
  return helper.dispatchAsyncAction(async (dispatch: any) => {
    dispatch(loadCurrentUserSuccess(null));
    authService.saveToken(null);
  }, null);
};

export const forgotPassword = (email: string) => {
  return helper.dispatchAsyncAction(async () => {
    let response = await authService.passwordForgot(email);

    if (response && response.message) uiHelper.showMessage(response.message);
  }, null);
};

export const resetPassword = (userData: any) => {
  return helper.dispatchAsyncAction(async () => {
    let response = await authService.resetPassword(userData);
    return response;
  }, null);
};

export const activateUserAccount = (token: string) => {
  return helper.dispatchAsyncAction(async () => {
    let response = await authService.activateAccount(token);
    return response;
  }, null);
};

export const signUp = (user: any) => {
  return helper.dispatchAsyncAction(async () => {
    let response = await authService.signUp(user);
    return response;
  }, null);
};

export const checkResetToken = (token: string) => {
  return helper.dispatchAsyncAction(async () => {
    let response = await authService.resetPasswordTokenCheck(token);
    return response;
  }, null);
};
