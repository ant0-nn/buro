import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    loading: false,
    data: [],
    project: null,
};

export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
    try {
        const response = await axios.get('/getprojectswithimageprev');
        return response.data;
    } catch (e) {
        console.log(e);
    }
});

export const getProjectById = createAsyncThunk('project/getProjectByName', async (id) => {
    try {
        const response = await axios.get(`/getprojectbyname?id=${id}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
});

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProjects.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            console.error('Error fetching data:', action.error);
        })
        .addCase(getProjectById.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProjectById.fulfilled, (state, action) => {
            state.loading = false;
            state.project = action.payload;
        })
        .addCase(getProjectById.rejected, (state, action) => {
            state.loading = false;
            console.error('Error fetching project by name:', action.error);
        });
    },
});

export const selectProjectById = (state) => state.project.project;

export const selectProjects = (state) => state.project.data;
export const selectLoading = (state) => state.project.loading;

export default projectSlice.reducer;
