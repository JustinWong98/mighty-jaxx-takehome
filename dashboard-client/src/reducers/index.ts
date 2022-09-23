// Index page to combine all slices into a rootReducer

import { combineReducers } from 'redux';

import productReducer from '../components/Product/productSlice';
import authReducer from '../components/Login/authSlice';

const rootReducer = combineReducers({
    products: productReducer,
    auth: authReducer
});

export default rootReducer;
