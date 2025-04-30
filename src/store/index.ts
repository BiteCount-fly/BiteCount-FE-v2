import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import mealsReducer from "./slices/mealsSlice"
import statsReducer from "./slices/statsSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    meals: mealsReducer,
    stats: statsReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
