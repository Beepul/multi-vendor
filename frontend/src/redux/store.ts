import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user';
import shopSlice from './reducers/shop';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		shop: shopSlice.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
