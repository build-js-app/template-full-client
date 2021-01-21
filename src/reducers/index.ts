import {combineReducers} from 'redux';
import common from './commonReducer';
import user from './userReducer';
import record from './recordReducer';
import category from './categoryReducer';

const rootReducer = combineReducers({
  user,
  record,
  category,
  common
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
