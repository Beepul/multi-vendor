import { createReducer, createSlice } from '@reduxjs/toolkit';

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
	token: string;
}

const initialState: UserState = {
	loading: 'idle',
	isAuthenticated: false,
	error: null,
	user: null,
	token: ''
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loadUser: (state, action) => {}
	}
});

export const { loadUser } = userSlice.actions;

export default userSlice;
