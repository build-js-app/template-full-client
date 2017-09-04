import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';
import 'font-awesome/css/font-awesome.min.css';
import 'flatpickr/dist/flatpickr.min.css';

import {routes} from './routes';
import App from './components/App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App routes={routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
