import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product } from '../../app/types';

type ProductState = {
    isLoading: boolean;
    error: null | string;
    productList: Product[];
};

const initialState = {
    isLoading: false,
    error: null,
    productList: []
} as ProductState;

export const fetchProducts = createAsyncThunk('products/getProducts', async (_, thunkApi) => {
    try {
        const response = await axios.get(`http://localhost:5000/products`);
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

export const addProduct = createAsyncThunk('products/addProduct', async (formData: FormData, thunkApi) => {
    try {
        console.log(Object.fromEntries(formData));
        const response = await axios.post(`http://localhost:5000/products`, Object.fromEntries(formData), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productPending: (state) => {
            state.isLoading = true;
        },
        productSuccess: (state, action) => {
            state.isLoading = false;
            state.productList = action.payload;
        },
        productFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
        // addProduct: (state, action) => {},
        // editProduct: (state, action) => {},
        // deleteProduct: (state, action) => {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { productPending, productSuccess, productFailure } = productSlice.actions;

export default productSlice.reducer;
