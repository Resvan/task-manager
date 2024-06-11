import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any;
    isAuthenticated: boolean;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    token:null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<any>) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
