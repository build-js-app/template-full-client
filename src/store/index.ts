import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import {categoryApi} from 'services/categoryService';

import categoryReducer from 'reducers/categorySlice';
import commonReducer from 'reducers/commonSlice';
import recordReducer from 'reducers/recordSlice';
import userReducer from 'reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    record: recordReducer,
    category: categoryReducer,
    common: commonReducer,
    [categoryApi.reducerPath]: categoryApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(categoryApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
