import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    data: [],
    blogData: [],
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

export const getAllBlogs = createAsyncThunk("/blog/get-all", async () => {
    try {
        const res = axiosInstance.get("blog/get-allblog");
        toast.promise(res, {
            loading: 'Wait! Fetching Blog',
            success: 'Fetched Successfully',
            error: 'Failed to Fetched'
        })
        return (await res).data
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
})

export const getBlog = createAsyncThunk("/blog/get", async (data) => {
    try {
        const res = axiosInstance.get(`blog/get-blog/${data}`);
        toast.promise(res, {
            loading: 'Wait! Fetching Blog',
            success: 'Fetched Successfully',
            error: 'Failed to Fetched'
        })
        return (await res).data
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
})
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
    extraReducers: (builder) => {
        builder.addCase(getAllBlogs.fulfilled, (state, action) => {
            state.blogData = action?.payload?.data?.blogs;
        })
    }
});


export default blogSlice.reducer;