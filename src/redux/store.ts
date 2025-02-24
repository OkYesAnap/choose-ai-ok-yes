import { configureStore } from '@reduxjs/toolkit';
import messageSlicer from './messagesSlice';

const store = configureStore({
	reducer: {
		messages: messageSlicer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const messages = (state: RootState) => state.messages;

export default store;