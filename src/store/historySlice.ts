import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ISaved } from '../components/SavedHistory'
import { RootState } from "./store"

interface initState {
    history: ISaved[],
    // increment add to history
    adds: number,
    // increment delete of history
    rms: number
}
const initialState: initState = {
    history: [],
    adds: 0,
    rms: 0
}
export const historySlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ISaved>) => {
            state.history.push(action.payload)
            state.adds++
        },
        remove: (state, action: PayloadAction<string>) => {
            state.history = state.history.filter((value, index) => value.id != action.payload)
            state.rms++
        },
    }
})

// Action creators are generated for each case reducer function
export const { add, remove } = historySlice.actions
export const getSelector = (state: RootState) => state.history.history
export const getAdds = (state: RootState) => state.history.adds
export const getRms = (state: RootState) => state.history.rms
export default historySlice.reducer