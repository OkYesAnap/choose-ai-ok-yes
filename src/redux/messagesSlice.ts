import { EngineRole, IEngineMessage, keys, requestStatus } from '@/services/gptApi';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// export type requestStatus = "idle" | "pending" | "success" | "error"

type EngineTypes = "gpt" | "deepseek"

export interface EngineParams {
    name: EngineTypes,
    models: {
        current: number,
        available: string[]
    },
    urls: {
		chat: string
		audio?: string;
	}
}


const developerInitialState: IEngineMessage = {
	role: EngineRole.system,
	status: requestStatus.idle,
	content: `you are software professional with 5 years of experience. 
		expert new Next.js version 13+ !impotent 
		applications structure, src/app/page.tsx
		Tailwind JS 
		English language consultant.
		my first name is "Andrii", Last name "Panaseiko", you can use my name if needed.
		`
}

export const fetchMessages = createAsyncThunk<MessagesDTO, { messages: IEngineMessage[], params: EngineParams }>(
	'messages/fetchMessages',
	async ({ messages, params }) => {
		const { available, current } = params.models;
		const apiRequestBody = { messages, model: available[current] };
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

interface MessagesDTO {
	choices: Array<{ message: any }>;
}

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<IEngineMessage>) => {
			state.push(action.payload);
		},
		remove: (state, action: PayloadAction<number>) => {
			state.splice(action.payload, 1);
		},
		setMessages: (state, action: PayloadAction<Array<IEngineMessage>>) => {
			return action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.
			addCase(fetchMessages.fulfilled, (state, action: PayloadAction<MessagesDTO>) => {
				console.log(action.payload, '<<<<<<<');
				state.push({ ...action.payload.choices[0].message, status: requestStatus.success });
			})
	}
});

export const { add, remove, setMessages } = messagesSlice.actions;


export default messagesSlice.reducer;
