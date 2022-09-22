// Index page to combine all slices into a rootReducer

import { combineReducers } from 'redux';

import productReducer from '../components/Product/productSlice';

const rootReducer = combineReducers({
    products: productReducer
});

export default rootReducer;
