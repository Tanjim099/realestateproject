import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    projects: []
}

export const createProject = createAsyncThunk('/project/create', async (data) => {
    try {
        console.log(data);
        const res = axiosInstance.post('create/', data);
        console.log(res);
        toast.promise(res, {
            loading: 'Creating New Project',
            success: 'Project Created Successfully',
            error: 'Failed to create project'
        });

        return (await res).data;

    } catch (Error) {
        console.log(Error);
    }
});

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
     }
})

export default projectSlice.reducer;