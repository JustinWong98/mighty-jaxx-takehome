import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../app/types';
import axios from 'axios';
import { getErrorMessage } from '../../app/handlerFunctions';
// import dotenv from 'dotenv';

import { create } from 'domain';

// dotenv.config();

const initialState: Product[] = [
    { SKU: 1, title: 'First Product', image: 'firstImageUrl' },
    { SKU: 2, title: 'Second Product', image: 'SecondImageUrl' }
];

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//     try {
//         const response = await axios.get(`http://localhost:5000/products`);
//         return [...response.data];
//     } catch (err) {
//         return getErrorMessage(err);
//     }
// });

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {},
        editProduct: (state, action) => {},
        deleteProduct: (state, action) => {}
    }
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
