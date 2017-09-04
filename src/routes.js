import React from 'react';

import RecordsPage from './components/records/RecordsPage';
import CategoriesPage from './components/categories/CategoriesPage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import PasswordForgotPage from './components/auth/PasswordForgotPage';
import PasswordResetPage from './components/auth/PasswordResetPage';
import ActivationPage from './components/auth/ActivationPage';
import NotFountPage from './components/NotFoundPage';

export const routes = [
  {
    path: '/',
    exact: true,
    main: props => <RecordsPage {...props} />
  },
  {
    path: '/records',
    main: props => <RecordsPage {...props} />
  },
  {
    path: '/categories',
    main: props => <CategoriesPage {...props} />
  },
  {
    path: '/login',
    main: props => <LoginPage {...props} />
  },
  {
    path: '/signup',
    main: props => <SignUpPage {...props} />
  },
  {
    path: '/password-forgot',
    main: props => <PasswordForgotPage {...props} />
  },
  {
    path: '/password-reset/:token',
    main: props => <PasswordResetPage {...props} />
  },
  {
    path: '/activate/:token',
    main: props => <ActivationPage {...props} />
  },
  {
    path: '/*',
    main: props => <NotFountPage {...props} />
  }
];
