import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    users: [],
    blogs: [],
}

export const getUsers = createAsyncThunk("/stat/get", async (data) => {
    console.log(data[0])
    try {
        const res = axiosInstance.get(`/admin/stat/users?page=${data.page}&limit=${data.limit}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        })
        return (await res).data
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
})

export const deleteUser = createAsyncThunk("/stat/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`/admin/stat/user/${id}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        })
        return (await res).data
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
});

export const getBlogs = createAsyncThunk("/stat/getblogs", async (data) => {
    try {
        const res = axiosInstance.get(`/admin/stat/blogs?page=${data.page}&limit=${data.limit}`);
        console.log(res)
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        })
        return (await res).data
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
})
const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action?.payload?.data;
                console.log(action)
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.blogs = action?.payload?.data
            })
    }
});

export default statSlice.reducer;