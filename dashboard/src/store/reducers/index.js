import { combineReducers } from 'redux';

import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import subCategoryReducer from './subCategoryReducer';
import attributesReducer from "./attributeReducer";
import productReducer from './productReducer';



const rootReducer = combineReducers({
  user:userReducer,
  category:categoryReducer,
  subCategory:subCategoryReducer,
  attribute:attributesReducer,
  product:productReducer,
});

export default rootReducer;
