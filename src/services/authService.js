import Cookies from 'js-cookie';

import httpHelper from '../helpers/httpHelper';
import {router} from '../index';

export default {
  signUp,
  login,
  activateAccount,
  passwordForgot,
  redirectToLogin,
  redirectToHome,
  resetPasswordTokenCheck,
  resetPassword,
  getToken,
  saveToken
}

function signUp(user) {
  return httpHelper.post('/api/sign-up', user);
}

function login(user) {
  return httpHelper.post('/api/login', user);
}

function activateAccount(token) {
  return httpHelper.get(`/api/activate/${token}`);
}

function passwordForgot(email) {
  return httpHelper.post('/api/password-forgot', {email});
}

function resetPasswordTokenCheck(token) {
  return httpHelper.get(`/api/password-reset/${token}`);
}

function resetPassword(user) {
  return httpHelper.post('/api/password-reset', user);
}

function redirectToLogin() {
  router.push('/login');
}

function redirectToHome() {
  router.push('/');
}

function getToken() {
  let token = Cookies.get('jwt_token');
  return token;
}

function saveToken(jwt) {
  Cookies.set('jwt_token', jwt);
}