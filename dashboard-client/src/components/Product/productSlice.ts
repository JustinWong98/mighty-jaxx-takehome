import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../app/types';

const initialState: Product[] = [
    { SKU: 1,  title: 'First Product', image: 'firstImageUrl' },
    { SKU: 2,  title: 'Second Product', image: 'SecondImageUrl' }
]

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
})

export default productSlice.reducer