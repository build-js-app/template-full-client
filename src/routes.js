import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import RecordsPage from './components/records/RecordsPage';
import CategoriesPage from './components/categories/CategoriesPage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import PasswordForgotPage from './components/auth/PasswordForgotPage';
import PasswordResetPage from './components/auth/PasswordResetPage';
import ActivateionPage from './components/auth/ActivationPage';
import NotFountPage from './components/NotFoundPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={RecordsPage}/>
        <Route path="records" component={RecordsPage}/>
        <Route path="categories" component={CategoriesPage}/>
        <Route path="login" component={LoginPage}/>
        <Route path="signup" component={SignUpPage}/>
        <Route path="password-forgot" component={PasswordForgotPage}/>
        <Route path="password-reset/:token" component={PasswordResetPage}/>
        <Route path="activate/:token" component={ActivateionPage}/>
        <Route path="*" component={NotFountPage}/>
    </Route>
);
