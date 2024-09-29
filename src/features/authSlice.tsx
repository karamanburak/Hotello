import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
    currentUser: null,
    loading: false,
    error: false,
    bearer: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLoading: state => {
            state.loading = true;
            state.error = false
        },
        registerSuccess: (state, { payload }) => {
            state.loading = false;
            state.currentUser = payload?.data?.username;
            state.bearer = payload?.access;
        },
        loginSuccess: (state, { payload }) => {
            state.loading = false;
            state.currentUser = payload?.user;
            state.bearer = payload?.access;
        },
        updateUserSuccess: (state, { payload }) => {
            state.loading = false;
            state.currentUser = payload.new
        },
        forgotPasswordSuccess: (state) => {
            state.loading = false;
            state.error = false;
        },
        resetPasswordSuccess: (state) => {
            state.loading = false;
            state.error = false;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.bearer = null;
        },
        fetchFail: state => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const {
    startLoading,
    registerSuccess,
    loginSuccess,
    updateUserSuccess,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    logoutSuccess,
    fetchFail,
} = authSlice.actions;

export default authSlice.reducer;