import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : false,
    role: "",
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null,
    signData: null,
}

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post('auth/login', data);
        // console.log(res);

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
            loading: 'Wait! Register in progress...',
            success: 'Successfully Registered',
            error: 'Failed Register'
        });

        return (await res).data;

    } catch (Error) {
        console.log(Error);
    }
});

export const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        const res = axiosInstance.get('auth/logout');

        toast.promise(res, {
            loading: "Wait! Logout in progress...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to logout"
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
            state.signData = action?.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action?.payload?.data)
            state.data = action?.payload?.data;
            state.role = action?.payload?.data?.role;
            localStorage.setItem('data', JSON.stringify(action?.payload?.data));
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            state.isLoggedIn = true;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.data = null;
            localStorage.clear();
            state.isLoggedIn = false;
        })
    }
})

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;