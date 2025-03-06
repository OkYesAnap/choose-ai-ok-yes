import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import params from "@/config.json";

const { config } = params;

export const enginesNamesList = config.map(engine => engine.name);

const engineParamsSlice = createSlice({
    name: 'engineParams',
    initialState: params,
    reducers: {
        changeModel: (state, action: PayloadAction<number>) => {
            const {currentEngine} = state
            state.config[currentEngine].models.current = action.payload;
        },
        changeEngine: (state, action: PayloadAction<number>) => {
            state.currentEngine = action.payload;
            return state;
        }
    }
})

export const { changeModel, changeEngine } = engineParamsSlice.actions;

export default engineParamsSlice.reducer;