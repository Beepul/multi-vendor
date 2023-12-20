import { createSlice } from "@reduxjs/toolkit";
import { createProductAsync } from "../actions/product";

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    tags?: string;
    originalPrice: string;
    discountPrice: string;
    stock: string;
    shopId: string;
}

interface ProductState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: null | string;
    products: Product[]
}

const initialState: ProductState = {
    loading: 'idle',
    error: null,
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createProductAsync.pending, (state) => {
                state.loading ='pending'
                state.error = null
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.loading ='succeeded'
                state.products = [action.payload.product, ...state.products ]
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message || 'An error occured '
                throw action.error
            })
    },
})

export default productSlice