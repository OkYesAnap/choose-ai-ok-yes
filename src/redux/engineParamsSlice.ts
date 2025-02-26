import { Engines } from "@/constants/main";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export type GptModelTypes = "gpt-4o-mini" | "gpt-4o" | ""
export type DeepseekModelTypes = "deepseek-chat" | "deepseek-reasoner" | ""

interface Urls {
    chat: string;
    audio?: string;
}

const gptUrls: Urls = {
    chat: "https://api.openai.com/v1/chat/completions",
    audio: "https://api.openai.com/v1/audio/transcriptions"
}
const deepSeekUrls: Urls = {
    chat: "https://api.deepseek.com/chat/completions"
}


export interface EngineParams {
    name: Engines,
    models: {
        current: GptModelTypes | DeepseekModelTypes,
        availableModels: GptModelTypes[] | DeepseekModelTypes[];
    },
    urls: Urls
}

const defaultGpt: EngineParams = {
    name: Engines.GPT,
    models: {
        current: '',
        availableModels: ['gpt-4o-mini', 'gpt-4o'],
    }, urls: gptUrls
}

const defaulDeepseek: EngineParams = {
    name: Engines.DEEP_SEEK,
    models: {
        current: '',
        availableModels: ['deepseek-chat', 'deepseek-reasoner'],
    },
    urls: deepSeekUrls
}

export const EnginesParams: { [key in Engines]: EngineParams } = {
    [Engines.GPT]: defaultGpt,
    [Engines.DEEP_SEEK]: defaulDeepseek
}

const engineParamsSlice = createSlice({
    name: 'engineParams',
    initialState: EnginesParams[Engines.GPT],
    reducers: {
        changeModel: (state, action: PayloadAction<GptModelTypes | DeepseekModelTypes>) => {
            state = { ...state, models: { ...state.models, current: action.payload } };
            return state;
        },
        changeEngine: (state, action: PayloadAction<Engines>) => {
            state = EnginesParams[action.payload];
            return state;
        }
    }
})

export const { changeModel, changeEngine } = engineParamsSlice.actions;

export default engineParamsSlice.reducer;