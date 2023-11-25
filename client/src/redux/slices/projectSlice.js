import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    projects: []
}

export const createNewProject = createAsyncThunk("/project/create", async (data) => {
    try {
        console.log('Starting...');
        console.log(data);
        const res = axiosInstance.post('project/create/', data);
        console.log(res);

        toast.promise(res, {
            loading: 'Creating New Project',
            success: 'Project Created Successfully',
            error: 'Failed to create project'
        });

        return (await res).data;

    } catch (Error) {
        console.log(Error);
        toast.error(Error);
        throw Error;
    }
});

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewProject.pending, (state) => {
            // Handle pending state if needed
            console.log('Pending...');
        });

        builder.addCase(createNewProject.fulfilled, (state, action) => {
            // Handle fulfilled state
            console.log('Fulfilled...');
            console.log(action.payload);  // This will contain the result of the async operation
        });

        builder.addCase(createNewProject.rejected, (state, action) => {
            // Handle rejected state
            console.log('Rejected...');
            console.error(action.error);
            toast.error('Failed to create project');
        });
    }
})

export default projectSlice.reducer;