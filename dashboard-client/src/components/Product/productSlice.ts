import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product, ProductListing } from '../../app/types';

type ProductState = {
    isLoading: boolean;
    error: null | string;
    productList: ProductListing[];
    product: ProductListing | null;
};

const initialState = {
    isLoading: false,
    error: null,
    productList: [],
    product: null
} as ProductState;

export const fetchProducts = createAsyncThunk('products/getProducts', async (_, thunkApi) => {
    try {
        const response = await axios.get(`http://localhost:5000/products`);
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

export const getProduct = createAsyncThunk('products/getProduct', async (id: string, thunkApi) => {
    try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

export const editProduct = createAsyncThunk('products/editProduct', async ({ oldID, formData }: { oldID: string; formData: FormData }, thunkApi) => {
    console.log(formData);
    try {
        const response = await axios.patch(`http://localhost:5000/products/${oldID}`, Object.fromEntries(formData), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

export const addProduct = createAsyncThunk('products/addProduct', async (formData: FormData, thunkApi) => {
    try {
        const response = await axios.post(`http://localhost:5000/products`, Object.fromEntries(formData), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number, thunkApi) => {
    try {
        const response = await axios.delete(`http://localhost:5000/products/${id}`);
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
        getProductSuccess: (state, action) => {
            state.isLoading = false;
            state.productList = action.payload;
        },
        productFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        writeProductSuccess: (state) => {
            state.isLoading = false;
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
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.productList = action.payload;
            });
    }
});

export const { productPending, getProductSuccess, productFailure, writeProductSuccess } = productSlice.actions;

export default productSlice.reducer;
