import { engines } from '@/constants/main';
import { EngineRole, IEngineMessage, keys, requestToEngine } from '@/services/gptApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EngineParams } from './engineParamsSlice';


const developerInitialState: IEngineMessage = {
	role: EngineRole.system,
	content: `you are software professional with 5 years of experience. 
		expert new Next.js version 13+ !impotent 
		applications structure, src/app/page.tsx
		Tailwind JS 
		English language consultant.
		my first name is "Andrii", Last name "Panaseiko", you can use my name if needed.
		`
}

export const fetchMessages = createAsyncThunk<string, {messages:IEngineMessage[], params: EngineParams}>(
	'messages/fetchMessages', 
	async ({messages, params}) => {
	const apiRequestBody = { messages, model: params.models.current };
	const response = await axios.post(params.urls.chat, apiRequestBody,
		{
			headers: {
				"Authorization": "Bearer " + keys[params.name],
				"Content-Type": "application/json"
			}
		});
	return response.data;
});


const initialState: IEngineMessage[] = [developerInitialState]

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<IEngineMessage>) => {
			state = [...state, action.payload];
			return state;
		},
		remove: (state, action: PayloadAction<number>) => {
			state.splice(action.payload, 1);
			return state;
		},
		setMessages: (state, action: PayloadAction<Array<IEngineMessage>>) => {
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.
			addCase(fetchMessages.fulfilled, (state, action: PayloadAction<any>) => {
				state = [...state, action.payload.choices[0].message];
				return state;
			})
	}
});

export const { add, remove, setMessages } = messagesSlice.actions;


export default messagesSlice.reducer;
