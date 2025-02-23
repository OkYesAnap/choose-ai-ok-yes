import { configureStore } from '@reduxjs/toolkit';
import {exampleSlicer} from './slice';

const store = configureStore({
	reducer: {
		example: exampleSlicer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const example = (state: RootState) => state.example.value;

export default store;