import Cookies from 'js-cookie';

import httpHelper from '@/helpers/httpHelper';

export default {
  signUp,
  login,
  activateAccount,
  passwordForgot,
  resetPasswordTokenCheck,
  resetPassword,
  getToken,
  saveToken
};

function signUp(user: NewUser) {
  return httpHelper.post('/api/sign-up', user);
}

function login(user: UserLocal) {
  return httpHelper.post('/api/login', user);
}

function activateAccount(token: string) {
  return httpHelper.get(`/api/activate/${token}`, {});
}

function passwordForgot(email: string) {
  return httpHelper.post('/api/password-forgot', {email});
}

function resetPasswordTokenCheck(token: string) {
  return httpHelper.get(`/api/password-reset/${token}`, {});
}

function resetPassword(user: ResetUser) {
  return httpHelper.post('/api/password-reset', user);
}

function getToken() {
  const token = Cookies.get('jwt_token');
  return token;
}

function saveToken(jwt: string | null) {
  if (!jwt) {
    Cookies.remove('jwt_token');
    return;
  }

  Cookies.set('jwt_token', jwt);
}
