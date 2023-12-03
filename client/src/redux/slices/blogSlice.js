import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    data: [],
}

export const createBlog = createAsyncThunk("/blog/create", async (data) => {
    try {
        const res = axiosInstance.post('blog/create', data);

        toast.promise(res, {
            loading: 'Wait! Create Blog',
            success: 'Created Successfully',
            error: 'Failed to Create'
        });

        return (await res)?.data;

    } catch (Error) {
        console.log(Error);
    }
});


export const deleteBlog = createAsyncThunk("/blog/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`/blog/delete/${id}`);
        toast.promise(res, {
            loading: 'Wait! Deleting Blog',
            success: 'Successfully',
            error: 'Failed to delete'
        });

        return (await res)?.data;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
});

export const updateBlog = createAsyncThunk("/blog/update", async (id) => {
    try {

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
})

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
});


export default blogSlice.reducer;