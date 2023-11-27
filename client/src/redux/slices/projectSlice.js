import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    projects: [],
    editProject: false,
    project: null,
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

<<<<<<< HEAD
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
=======
export const updateNewProject = createAsyncThunk("/project/update", async (data) => {
    try {
        console.log('Starting...');
        console.log(data);
        const res = axiosInstance.post(`project/update/${data[1]}`, data[0]);
        console.log(res);

        toast.promise(res, {
            loading: 'Wait! Updating Project',
            success: 'Project Updating Successfully',
            error: 'Failed to Updating project'
        });

        return (await res).data;

    } catch (Error) {
>>>>>>> a0de5187c93e1f7ef60da7fa7e6dc18dd4ace77c
        console.log(Error);
        toast.error(Error);
        throw Error;
    }
<<<<<<< HEAD
})
=======
});
>>>>>>> a0de5187c93e1f7ef60da7fa7e6dc18dd4ace77c

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setEditProject: (state, action) => {
            state.editProject = action?.payload;
        },
        setProject: (state, action) => {
            state.project = action?.payload;
        }
    },
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

export const { setEditProject, setProject } = projectSlice.actions;

export default projectSlice.reducer;