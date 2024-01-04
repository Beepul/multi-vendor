import { createSlice } from "@reduxjs/toolkit";
import { createProductAsync, deleteProductAsync, getAllProductsAsync } from "../actions/product";
import { Product } from "../../types/product";



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
                const updatedProductList = state.products;
                updatedProductList.unshift(action.payload.product);
                state.products = updatedProductList;
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message || 'An error occured '
                throw action.error
            })
            .addCase(getAllProductsAsync.pending, (state) => {
                state.loading ='pending'
                state.error = null
            })
            .addCase(getAllProductsAsync.fulfilled, (state, action) => {
                state.loading ='succeeded'
                state.products = action.payload.products
            })
            .addCase(getAllProductsAsync.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message || 'An error occured '
            })
            .addCase(deleteProductAsync.pending, (state) => {
                state.loading ='pending'
                state.error = null
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.loading ='succeeded'
                state.products = state.products.filter(product => product._id !== action.payload)
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message || 'An error occured '
                throw action.error
            })
    },
})

export default productSlice