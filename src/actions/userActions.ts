import helper from './actionHelper';
import uiHelper from 'helpers/uiHelper';

import dataService from 'services/dataService';
import authService from 'services/authService';

import {LOAD_CURRENT_USER} from 'action_types/userActionTypes';

export default {
  getCurrentUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  activateUserAccount,
  signUp,
  checkResetToken
};

function getCurrentUser() {
  return helper.dispatchAsyncAction(async dispatch => {
    const user = await dataService.getCurrentUser();
    const action = helper.getAction(LOAD_CURRENT_USER, {user});
    dispatch(action);
  });
}

function loginUser(user) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.login(user);

    if (response && response.token) {
      authService.saveToken(response.token);
    }
  });
}

function logOut() {
  return helper.dispatchAsyncAction(async dispatch => {
    const action = helper.getAction(LOAD_CURRENT_USER, {user: null});
    dispatch(action);
    authService.saveToken(null);
  });
}

function forgotPassword(email: string) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.passwordForgot(email);

    if (response && response.message) uiHelper.showMessage(response.message);
  });
}

function resetPassword(userData) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.resetPassword(userData);
    return response;
  });
}

function activateUserAccount(token) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.activateAccount(token);
    return response;
  });
}

function signUp(user) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.signUp(user);
    return response;
  });
}

function checkResetToken(token) {
  return helper.dispatchAsyncAction(async () => {
    const response = await authService.resetPasswordTokenCheck(token);
    return response;
  });
}
