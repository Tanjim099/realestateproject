const initialState = {
    projects: []
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: () => { }
})

export default projectSlice.reducer;