import { configureStore } from '@reduxjs/toolkit';
import ProjectSlice from './fuatures/ProjectSlice';
import FlowersSlice from './fuatures/FlowersSlice';

export const store = configureStore({
    reducer: {
        project: ProjectSlice,
        flowers: FlowersSlice,
    },
});
