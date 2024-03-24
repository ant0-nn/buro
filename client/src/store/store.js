import { configureStore } from '@reduxjs/toolkit';
import ProjectSlice from './fuatures/ProjectSlice';

export const store = configureStore({
    reducer: {
        project: ProjectSlice,
    },
});
