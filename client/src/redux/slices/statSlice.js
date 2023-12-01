import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    users: []
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
    }
});

export default statSlice.reducer;