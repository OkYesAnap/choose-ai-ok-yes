import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
	value: number;
}

const initialState: ExampleState = {
	value: 0,
};

const exampleSlice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		setValue: (state, action: PayloadAction<number>) => {
			console.log(action);
			state.value = action.payload;
		},
	},
});

export const { increment, decrement, setValue } = exampleSlice.actions;


const exampleSlicer = exampleSlice.reducer;
export {exampleSlicer};