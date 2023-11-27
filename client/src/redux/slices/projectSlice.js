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

export const getAllProjects = createAsyncThunk("/project/getall", async () => {
    try {
        const res = axiosInstance.get("project//getall");
        console.log(res);
        toast.promise(res, {
            loading: "Wait Getting All Data",
            success: "All Data Fetched Successfully",
            error: "Failed to Fetcheing Data"
        });
        return (await res).data
    } catch (error) {
        console.log(Error);
        toast.error(Error);
        throw Error;
    }
})

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewProject.pending, (state) => {
            console.log('Pending...');
        });

        builder.addCase(createNewProject.fulfilled, (state, action) => {
            console.log('Fulfilled...');
            console.log(action.payload);  // This will contain the result of the async operation
        });

        builder.addCase(createNewProject.rejected, (state, action) => {
            console.log('Rejected...');
            console.error(action.error);
            toast.error('Failed to create project');
        });

        builder.addCase(getAllProjects.pending, (state) => {
            console.log("Pending...")
        });
        builder.addCase(getAllProjects.fulfilled, (state, action) => {
            console.log('Fulfilled...');
            console.log(action.payload);
        });
        builder.addCase(getAllProjects.rejected, (state, action) => {
            console.log('Rejected...');
            console.error(action.error);
            toast.error('Failed to fetched project');
        });
    }
})

export default projectSlice.reducer;