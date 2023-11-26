import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: false,
    role: "",
    data: []
}

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post('auth/login', data);
        console.log(res);

        toast.promise(res, {
            loading: 'Wait! Login',
            success: 'Successfully Login',
            error: 'Failed Login',
        });

        return (await res).data;

    } catch (Error) {
        console.log(Error);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.data = action?.payload;
            localStorage.setItem('data', JSON.stringify(action?.payload?.data));
            state.isLoggedIn = true;
        })
    }
})

export default authSlice.reducer;