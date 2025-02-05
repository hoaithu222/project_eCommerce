import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer, // Kết hợp tất cả reducers
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Thêm redux-thunk
});

export default store;
