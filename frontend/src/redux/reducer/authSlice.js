import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = true;
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const { setUser, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
