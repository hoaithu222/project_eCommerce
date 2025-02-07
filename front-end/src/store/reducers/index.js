import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  user:userReducer,
  shop:shopReducer,
  product:productReducer,
});

export default rootReducer;
