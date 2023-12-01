import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice";
import projectSlice from "./slices/projectSlice";
import blogSlice from "./slices/blogSlice";
import statSlice from './slices/statSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        project: projectSlice,
        blog: blogSlice,
        stat: statSlice
    },
    devTools: true
});

export default store