import { createSlice } from '@reduxjs/toolkit';
import { activateUserAsync, autoLoginAsync, createUserAsync, loginAsync } from '../actions/user';

interface User {
	_id: string;
	name: string;
	email: string;
}

interface UserState {
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
	isAuthenticated: boolean;
	error: string | null;
	user: User | null;
}


const initialState: UserState = {
	loading: 'idle',
	isAuthenticated: false,
	error: null,
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
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
				throw action .error
			})
	}
});

export const { } = userSlice.actions;

export default userSlice;
