import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import user from './userReducer';
import record from './recordReducer';
import category from './categoryReducer';

const rootReducer = combineReducers({
    user,
    record,
    category,
    ajaxCallsInProgress,
});

export default rootReducer;