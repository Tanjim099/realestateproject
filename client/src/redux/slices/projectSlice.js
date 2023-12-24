import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    projects: [],
    projectByPage: [],
    editProject: false,
    project: null,
    query: "",
    results: [],
    suggestions: [],
    status: "idle",
    error: null,
    similarProject: [],
}

export const createNewProject = createAsyncThunk("/project/create", async (data) => {
    try {
        // console.log('Starting...');
        // console.log(data);
        const res = axiosInstance.post('project/create/', data);
        // console.log(res);

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

export const updateProject = createAsyncThunk('', async (data) => {
    try {
        const res = axiosInstance.put(`/project/update/${data[1]}`, data[0]);

        toast.promise(res, {
            loading: 'Updating Project',
            success: 'Project Updating Successfully',
            error: 'Failed to Updating project'
        });

        return (await res).data;
    } catch (Error) {
        console.log(Error);
        toast.error(Error);
        throw Error;
    }
})

export const getAllProjects = createAsyncThunk("/project/getall", async () => {
    try {
        const res = axiosInstance.get("project/getall");
        // console.log(res);
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

export const getAllProjectsByPage = createAsyncThunk("/project/get-all", async (data) => {
    try {
        const res = axiosInstance.get(`project/get-all/projets?page=${data.page}&limit=${data.limit}`);
        // console.log(res);
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

export const getProject = createAsyncThunk("/project/getProject", async (pId) => {
    try {
        // console.log(pId);
        const res = axiosInstance.get(`project/get/${pId}`);
        // console.log(res);
        toast.promise(res, {
            loading: 'Wating',
            success: 'Successfully',
            error: 'Failed',
        });
        return (await res)?.data;
    } catch (Error) {
        console.log(Error);
    }
});


export const deleteProject = createAsyncThunk("/project/deleteProject", async (pId) => {
    try {
        const res = axiosInstance.delete(`project/delete/${pId}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        });
        return (await res).data
    } catch (error) {
        toast.error(Error);
        throw Error;
    }
})

export const searchProject = createAsyncThunk("/project/search", async (query) => {
    try {
        const res = axiosInstance.get("project/search/project", {
            params: { query },
        });

        toast.promise(res, {
            loading: 'Wait! Searching',
            error: 'Failed Searching'
        });

        return (await res)?.data;
    } catch (Error) {
        console.log(Error);
    }
});

export const getSuggestions = createAsyncThunk("/project/suggestions", async (query) => {
    try {
        const res = axiosInstance.get("project/suggestions", {
            params: { query },
        })
        toast.promise(res, {
            loading: 'Wait! Searching',
            error: 'Failed Searching'
        });

        return (await res)?.data;
    } catch (error) {
        console.log(Error);
    }
})


export const getSimilarProject = createAsyncThunk("/project/get-similar", async (data) => {
    try {
        // console.log(data);
        // console.log(data[0]);
        // console.log(data[1]);
        const res = axiosInstance.get(`project/similar/${data[0]}/${data[1]}`);
        toast.promise(res, {
            loading: 'Wait! Searching',
            success: 'Successfully',
            error: 'Failed Searching'
        });

        return (await res)?.data;
    } catch (error) {
        console.log(error.message);
    }
})

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setEditProject: (state, action) => {
            state.editProject = action?.payload;
        },
        setProject: (state, action) => {
            state.project = action?.payload;
        },
        setQuery: (state, action) => {
            console.log(action)
            state.query = action?.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNewProject.pending, (state) => {
            console.log('Pending...');
        });

        builder.addCase(createNewProject.fulfilled, (state, action) => {
            console.log('Fulfilled...');
            // console.log(action.payload);  // This will contain the result of the async operation
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
            state.projects = action?.payload.data
        });
        builder.addCase(getAllProjects.rejected, (state, action) => {
            console.log('Rejected...');
            console.error(action.error);
            toast.error('Failed to fetched project');
        });
        builder.addCase(getProject.fulfilled, (state, action) => {
            // console.log(action);
        });
        builder.addCase(getAllProjectsByPage.fulfilled, (state, action) => {
            state.projectByPage = action?.payload?.data
            // console.log(action);
        });
        builder.addCase(searchProject.fulfilled, (state, action) => {
            console.log(action);
            state.status = "Succeeded",
                state.results = action.payload;
        });
        builder.addCase(getSuggestions.fulfilled, (state, action) => {
            // console.log(action);
            state.suggestions = action.payload;
        });
        builder.addCase(getSimilarProject.fulfilled, (state, action) => {
            state.similarProject = action?.payload?.data;
            // console.log(action);
        })
    }
})

export const { setEditProject, setProject, setQuery } = projectSlice.actions;

export default projectSlice.reducer;