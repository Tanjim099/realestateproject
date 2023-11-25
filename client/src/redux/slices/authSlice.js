import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    role: "",
    data: []
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: () => { }
})

export default authSlice.reducer;