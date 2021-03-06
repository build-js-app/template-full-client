import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {ASYNC_ACTION_START, ASYNC_ACTION_END} from 'action_types/commonActionTypes';

const enhancers = [];

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(
      devToolsExtension({
        actionsBlacklist: [ASYNC_ACTION_START, ASYNC_ACTION_END]
      })
    );
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const configureStore = persistedState => createStore(rootReducer, persistedState, composedEnhancers);

export default configureStore;
