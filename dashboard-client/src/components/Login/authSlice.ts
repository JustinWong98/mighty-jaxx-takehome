import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { signupFormData, loginFormData } from '../../app/types';
import { getErrorMessage } from '../../app/handlerFunctions';

type AuthState = {
    isLoading: boolean;
    error: null | string;
    data: null | string;
};

const initialState = {
    isLoading: false,
    error: null,
    data: null
} as AuthState;

export const postAdmin = createAsyncThunk('auth/postAdmin', async (formData: signupFormData, thunkApi) => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/signup`, formData);
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

export const loginAdmin = createAsyncThunk('auth/login', async (formData: loginFormData, thunkApi) => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/login`, formData);
        return response.data;
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authPending: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        authFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postAdmin.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(postAdmin.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload.data.message;
            })
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload.data.message;
            })
            .addCase(loginAdmin.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { authPending, authSuccess, authFailure } = authSlice.actions;

export default authSlice.reducer;
