import {combineReducers} from 'redux';
import common, {CommonState} from './commonReducer';
import user, {UserState} from './userReducer';
import record, {RecordState} from './recordReducer';
import category, {CategoryState} from './categoryReducer';

const rootReducer = combineReducers({
  common,
  user,
  record,
  category
});

export interface AppState {
  common: CommonState;
  user: UserState;
  record: RecordState;
  category: CategoryState;
}

export default rootReducer;
