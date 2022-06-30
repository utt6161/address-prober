import { configureStore } from '@reduxjs/toolkit'
import { streetsApi } from './streetsAPI'

// just in case it will be needed, idk
const store = configureStore({
    reducer: {
        [streetsApi.reducerPath]: streetsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(streetsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export default store