import { createSlice } from '@reduxjs/toolkit';
import { activateUserAsync, autoLoginAsync, createUserAsync, loginAsync } from '../actions/user';
import { CartProduct } from '../../types/product';
import { User } from '../../types/user';



interface UserState {
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
	isAuthenticated: boolean;
	error: string | null;
	user: User | null;
	cart: CartProduct[]
}


const initialState: UserState = {
	loading: 'idle',
	isAuthenticated: false,
	error: null,
	user: null,
	cart: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const cartProduct: CartProduct = action.payload
			
			const existingProduct = state.cart.find((item) => item._id === cartProduct._id)

			const newCart = state.cart.map((product) => {
				return product._id === existingProduct?._id ? cartProduct : product
			})

			if(existingProduct){
				return {
					...state,
					cart: newCart
				}
			}else{
				return {
					...state,
					cart: [...state.cart, cartProduct]
				}
			}
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter((cart) => cart._id !== action.payload)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAsync.pending, (state) => {
				state.loading = 'pending'
				state.error = null
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.loading = 'succeeded'
				state.isAuthenticated = true 
				state.user = action.payload.user 
			})
			.addCase(loginAsync.rejected, (state,action) => {
				state.loading = 'failed'
				state.error = action.error.message || 'An error occured'
				throw action.error 
			})
			.addCase(createUserAsync.pending, (state) => {
				state.loading = 'pending'
				state.error = null
			})
			.addCase(createUserAsync.fulfilled, (state) => {
				state.loading = 'succeeded'
			})
			.addCase(createUserAsync.rejected, (state,action) => {
				state.loading = 'failed'
				state.error = action.error.message || 'An error occured'
				throw action.error 
			})
			.addCase(activateUserAsync.pending, (state) => {
				state.loading = 'pending'
				state.error = null
			})
			.addCase(activateUserAsync.fulfilled, (state, action) => {
				state.loading = 'succeeded'
				state.isAuthenticated = true 
				state.user = action.payload.user 
			})
			.addCase(activateUserAsync.rejected, (state,action) => {
				state.loading = 'failed'
				state.error = action.error.message || 'An error occured'
				throw action.error 
			})
			.addCase(autoLoginAsync.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(autoLoginAsync.fulfilled, (state, action) => {
				// console.log(action.payload.user)
				state.loading = 'succeeded'
				state.isAuthenticated = true 
				state.user = action.payload.user 
			})
			.addCase(autoLoginAsync.rejected, (state,action) => {
				state.loading = 'failed'
				state.error = action.error.message || 'An error occured while auto login'
				// throw action .error
			})
	}
});

export const { addToCart, removeFromCart} = userSlice.actions;

export default userSlice;
