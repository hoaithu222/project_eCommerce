import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  user:userReducer,
  shop:shopReducer,
  product:productReducer,
  cart:cartReducer,
});

export default rootReducer;
