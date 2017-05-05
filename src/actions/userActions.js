import toastr from 'toastr';

import * as types from './actionTypes';
import dataService from '../services/dataService';
import authService from '../services/authService';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function loadCurrentUserSuccess(user) {
    return {type: types.LOAD_CURRENT_USER_SUCCESS, user};
}

export function getCurrentUser() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return dataService.getCurrentUser()
            .then(user => {
                dispatch(loadCurrentUserSuccess(user));

                dispatch(endAjaxCall());
            }).catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    };
}

export function loginUser(user) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.login(user)
            .then(user => {
                dispatch(loadCurrentUserSuccess(user));

                dispatch(endAjaxCall());
            }).catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    }
}

export function logOut() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.logOut()
            .then(() => {
                dispatch(loadCurrentUserSuccess(null));

                dispatch(endAjaxCall());

                authService.redirectToLogin();
            }).catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    }
}

export function forgotPassword(email) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.passwordForgot(email)
            .then((data) => {
                if (data && data.message) toastr.success(data.message);

                dispatch(endAjaxCall());
            })
            .catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    }
}

export function resetPassword(userData) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.resetPassword(userData)
            .then((data) => {
                if (data && data.message) {
                    authService.redirectToLogin();

                    toastr.success(data.message);
                }

                dispatch(endAjaxCall());
            })
            .catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    }
}

export function activateUserAccount(token) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.activateAccount(token)
            .then((data) => {
                dispatch(endAjaxCall());

                return data;
            })
            .catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    }
}

export function signUp(user) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.signUp(user)
            .then((data) => {
                if (data && data.message) {
                    authService.redirectToLogin();

                    toastr.success(data.message);
                }

                dispatch(endAjaxCall());
            })
            .catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    }
}

export function checkResetToken(token) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.resetPasswordTokenCheck(token)
            .then((data) => {
                dispatch(endAjaxCall());

                return data;
            })
            .catch(error => {
                dispatch(endAjaxCall());

                throw(error);
            });
    }
}