import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    isLoggedIn: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : false,
    role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : "",
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    signData: null,
    userData: [],
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
        // console.log(res);

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

export const updateProfile = createAsyncThunk('/auth/user/update', async (data) => {
    try {
        console.log(data[1]);
        const res = axiosInstance.put(`auth/user/update`, data[0], {
            headers: {
                Authorization: `Bearer ${data[1]}`
            }
        });

        toast.promise(res, {
            loading: "Wait! Update...",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to Update"
        });
        return (await res)?.data;

    } catch (Error) {
        console.log(Error);
    }
});

export const forgotPassword = createAsyncThunk('/auth/forgot-password', async (data) => {
    try {
        const res = axiosInstance.post('auth/forget-password', data);

        toast.promise(res, {
            loading: 'Wait!Forgot Password',
            success: 'Forgot Password Successfully',
            error: 'Failed to Forgot Password',
        });

        return (await res)?.data;

    } catch (Error) {
        console.log(Error);
    }
});

export const getUserProfile = createAsyncThunk("/auth/user-profile", async (id) => {
    try {
        const res = axiosInstance.get(`auth/get-profile/${id}`);
        toast.promise(res, {
            loading: 'Wait! Fetching',
            success: 'Fetched Successfully',
            error: 'Failed Fetched Profile',
        });
        return (await res)?.data;
    } catch (error) {
        console.log(Error);
        toast.error(error.message);
    }
})

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
            if (action?.payload?.success) {
                state.data = action?.payload?.data;
                state.role = action?.payload?.data?.role;
                state.isLoggedIn = true;
                localStorage.setItem('data', JSON.stringify(action?.payload?.data));
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                localStorage.setItem('role', JSON.stringify(action?.payload?.data?.role));
                localStorage.setItem('token', JSON.stringify(action?.payload?.data?.token));
            }
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.data = null;
            state.role = ""
            state.isLoggedIn = false;
        })
        // builder.addCase(forgotPassword.fulfilled, (state, action) => {
        //     state.data = action?.payload?.data
        //     localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        // })
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userData = action?.payload?.data;
            console.log(action);
        })
    }
})

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;