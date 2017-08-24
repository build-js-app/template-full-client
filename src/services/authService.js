import httpHelper from '../helpers/httpHelper';

export default {
    signUp,
    login,
    logOut,
    activateAccount,
    passwordForgot,
    resetPasswordTokenCheck,
    resetPassword
}

function signUp(user) {
    return httpHelper.post('/api/sign-up', user);
}

function login(user) {
    return httpHelper.post('/api/login', user);
}

function logOut() {
    return httpHelper.post('/api/logout');
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