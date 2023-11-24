import authSlice from "./slices/authSlice";
import projectSlice from "./slices/projectSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        project: projectSlice
    },
    devTools: true
});

export default store