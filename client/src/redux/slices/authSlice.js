import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: false,
    role: "",
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null,
    signData: null,
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
});

export const sendOTP = createAsyncThunk("/auth/otp", async (data) => {
    try {
        console.log(data);
        const res = axiosInstance.post('auth/otp', { email: data });
        toast.promise(res, {
            loading: 'Wait! Send OTP',
            success: 'Successfully Send OTP',
            error: 'Failed Send OTP',
        });

        return (await res).data;
    } catch (Error) {
        console.log(Error);
    }
});

export const register = createAsyncThunk("/auth/register", async (data) => {
    try {
        const res = axiosInstance.post('auth/register', data);
        console.log(res);

        toast.promise(res, {
            loading: 'Wait! Veify',
            success: 'Successfully Registered',
            error: 'Failed Register'
        });

        return (await res).data;

    } catch (Error) {
        console.log(Error);
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            console.log(action?.payload);
            state.signData = action?.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.data = action?.payload;
            localStorage.setItem('data', JSON.stringify(action?.payload?.data));
            state.isLoggedIn = true;
        })
    }
})

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;