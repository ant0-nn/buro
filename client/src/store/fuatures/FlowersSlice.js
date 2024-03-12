import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    loading: false,
    data: [],
    project: null,
};

export const getFlowers = createAsyncThunk('flowers/getFlowers', async () => {
    try {
        const response = await axios.get('/getflowerswithimage');
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
});

const flowersSlice = createSlice({
    name: 'flowers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFlowers.pending, (state) => {
            state.loading = true;
        })
        .addCase(getFlowers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(getFlowers.rejected, (state, action) => {
            state.loading = false;
            console.error('Error fetching data:', action.error);
        });
    },
});

export const selectProjects = (state) => state.flowers.data;
export const selectLoading = (state) => state.flowers.loading;

export default flowersSlice.reducer;
