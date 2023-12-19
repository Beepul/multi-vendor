import { createSlice } from "@reduxjs/toolkit";
import { autoShopLoginAsync, shopActivateAsync, shopLoginAsync, shopRegisterAsync } from "../actions/shop";

interface Shop {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface ShopState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    isAuthenticated: boolean;
    error: null | string;
    shop: Shop | null
}

const initialState : ShopState = {
    loading: 'idle',
	isAuthenticated: false,
	error: null,
	shop: null,
}


const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(shopLoginAsync.pending, (state) => {
                state.loading = 'pending'
                state.error = null 
            })
            .addCase(shopLoginAsync.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.isAuthenticated = true 
                state.shop = action.payload.user
            })
            .addCase(shopLoginAsync.rejected, (state,action) => {
                state.loading = 'failed'
                state.error = action.error.message || 'And error occured while loggin in'
                throw action.error
            })
            .addCase(shopRegisterAsync.pending, (state) => {
                state.loading = 'pending'
                state.error = null 
            })
            .addCase(shopRegisterAsync.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(shopRegisterAsync.rejected, (state,action) => {
                state.loading = 'failed'
                state.error = action.error.message || 'And error occured while loggin in'
                throw action.error
            })
            .addCase(shopActivateAsync.pending, (state) => {
				state.loading = 'pending'
				state.error = null
			})
			.addCase(shopActivateAsync.fulfilled, (state, action) => {
				state.loading = 'succeeded'
				state.isAuthenticated = true 
				state.shop = action.payload.user 
			})
			.addCase(shopActivateAsync.rejected, (state,action) => {
				state.loading = 'failed'
				state.error = action.error.message || 'An error occured'
				throw action.error 
			})
            .addCase(autoShopLoginAsync.fulfilled, (state, action) => {
				state.loading = 'succeeded'
				state.isAuthenticated = true 
				state.shop = action.payload.shop 
			})
    }
})


export default shopSlice