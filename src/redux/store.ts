import { configureStore } from '@reduxjs/toolkit';
import messageSlicer from './messagesSlice';
import engineParamsSlicer from './engineParamsSlice'
import { useDispatch } from 'react-redux';

const store = configureStore({
	reducer: {
		messages: messageSlicer,
		engineParams: engineParamsSlicer
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const messages = (state: RootState) => state.messages;
export const engineParams = (state: RootState) => state.engineParams;

export default store;