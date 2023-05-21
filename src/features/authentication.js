import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	isAuthenticated: false,
	sessionId: '',
};

const authenticationSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.sessionId = localStorage.getItem('session_id');
		},
	},
});

export const { setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;

export const authSelector = state => state.authentication;
