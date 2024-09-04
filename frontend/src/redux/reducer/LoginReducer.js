import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        username: ""
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("loggedInTime");
            state.isLoggedIn = false;
        },
        setUsername: (state, action) => {
            state.username = action?.payload;
        },
    },
})

export const { login, logout, setUsername } = loginSlice.actions;
export default loginSlice.reducer;