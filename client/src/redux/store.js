import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice";
import projectSlice from "./slices/projectSlice";
import blogSlice from "./slices/blogSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        project: projectSlice,
        blog: blogSlice
    },
    devTools: true
});

export default store