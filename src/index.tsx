import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {routes} from 'routes';
import {store} from 'store';

import App from 'components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'toastr/build/toastr.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <React.StrictMode>
        <App routes={routes} />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
